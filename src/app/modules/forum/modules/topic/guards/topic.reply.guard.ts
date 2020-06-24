import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {TopicService} from '../../../../../services/forum/topic.service';

@Injectable()
export class TopicReplyGuard {

  constructor (
    private _forumService: ForumService,
    private _topicService: TopicService,
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this.dataPromise(route).then((response) => {
        let fetch: any = response;
        if (fetch.forum_data.permissions.comment === "all" || fetch.forum_data.permissions.comment === "own" && fetch.topic_data.topic_info.own) {
          return true;
        } else {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
      }).catch(() => {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
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
    let data: any = {};

    data.topic_data = await this._topicService.topic_view(route.params.id, 1, true).then((topic) => {
      return topic;
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });

    data.forum_data = await this._forumService.forum_pre_fetch(data.topic_data.topic_info.forum, true).then((forum) => {
      return forum.pre_fetch;
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });

    if (route.queryParams.quote) data.quoted_data = await this._topicService.post_get(route.queryParams.quote).then((post) => {
      return post;
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });

    return data;
  }
}
