import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {ForumService} from '../../services/forum.service';
import {TopicService} from '../../services/topic.service';
import * as moment from 'moment';

@Injectable()
export class TopicEditGuard {

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
        if (fetch.forum_data.permissions.edit === "all") {
          return true;
        } else if (fetch.post_data.writer.id == fetch.topic_data.topic_info.watcher) {
          let time = parseInt(fetch.post_data.created_at, 10)*1000;
          if (moment(time).add('1', 'hours').unix() > moment().unix()) {
            return true;
          } else {
            this._router.navigate(['/error'] , { queryParams: {type: "403"}});
            return false;
          }
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

    data.post_data = await this._topicService.post_get(route.params.id).then((post) => {
      return post.fixed_post;
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });

    data.topic_data = await this._topicService.topic_view(data.post_data.topic, 1, true).then((topic) => {
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

    return data;
  }
}
