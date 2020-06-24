import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';

@Injectable()
export class ForumListGuard {

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

  resolve(): Promise<any> {
    return this._forumService.forum_admin_list().then(response => {
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
