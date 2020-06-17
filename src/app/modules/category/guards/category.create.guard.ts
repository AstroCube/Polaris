import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoryCreateGuard {

  constructor (
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this._userService.permission_checker("web_permissions.category.manage").pipe(map(
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
}
