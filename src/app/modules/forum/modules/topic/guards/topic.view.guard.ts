import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum.service';
import {TopicService} from '../../../../../services/topic.service';

@Injectable()
export class TopicViewGuard {

  constructor (
    private _forumService: ForumService,
    private _topicService: TopicService,
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const token = this._userService.getToken();
    if (token) {
      return this.dataPromise(route).then((response) => {
        let fetch: any = response;
        if (fetch.forum_data.permissions.view === "all" || fetch.forum_data.permissions.view === "own" && fetch.topic_data.topic_info.own) {
          return true;
        } else {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
      }).catch(() => {
      });
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.dataPromise(route).then(response => {
      if (response) {
        return response;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    });
  }

  async dataPromise(route: ActivatedRouteSnapshot): Promise<any> {
    let data: any =  {};
    let page = 1;
    if (route.params.page) page = route.params.page;

    data.topic_data = await this._topicService.topic_view(route.params.id, page, false).then((topic) => {
      return topic;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });

    data.forum_data = await this._forumService.forum_pre_fetch(data.topic_data.topic_info.forum, true).then((forum) => {
      return forum.pre_fetch;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });

    return data;
  }
}
