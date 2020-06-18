import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum.service';

@Injectable()
export class ForumEditGuard {

  constructor (
    private _forumService: ForumService,
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this._userService.permission_checker("web_permissions.forum.manage").pipe(map(
        response => {
          if (response.has_permission) {
            return true;
          } else {
            this._router.navigate(['/error'] , { queryParams: {type: "403"}});
            return false;
          }
        }
      ));
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
    data.forum_tree = await this._forumService.forum_tree().then(response_tree => {
      if (response_tree) {
        return response_tree;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
    data.forum_info = await this._forumService.forum_admin_get(route.params.id).then(response_forum => {
      if (response_forum) {
        return response_forum;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
    return data;
  }

}
