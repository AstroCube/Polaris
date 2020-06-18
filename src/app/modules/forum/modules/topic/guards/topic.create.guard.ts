import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum.service';

@Injectable()
export class TopicCreateGuard {

  constructor (
    private _forumService: ForumService,
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const token = this._userService.getToken();
    if (route.queryParams.forum) {
      if (token && token !== "none") {
        return this._forumService.forum_pre_fetch(route.queryParams.forum, false).pipe(map(
          response => {
            let fetch: any = response;
            if (fetch.pre_fetch.permissions.create) {
              return true;
            } else {
              this._router.navigate(['/error'] , { queryParams: {type: "403"}});
              return false;
            }
          },
          error => {
              this._router.navigate(['/error'] , { queryParams: {type: "404"}});
              return false;
            }
        ));
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    } else {
      this._router.navigate(['/error'] , { queryParams: {type: "404"}});
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._forumService.forum_pre_fetch(route.queryParams.forum, true).then(response => {
      if (response) {
        return response;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
  }
}
