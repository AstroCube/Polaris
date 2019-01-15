import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';

@Injectable()
export class UserEditGuard {

  constructor (
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      if (!route.params.id) {
        return true;
      } else {
        return this._userService.permission_checker("web_permissions.user.manage").pipe(map(
          response => {
            if (response.has_permission) {
              return true;
            } else {
              this._router.navigate(['/error'] , { queryParams: {type: "403"}});
              return false;
            }
          }
        ));
      }
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    if (!route.params.id) {
      return this._userService.get_user(null).then(user => {
        if (user) {
          user.own = true;
          return user;
        } else {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }).catch(() => {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      });
    } else {
      return this._userService.get_user(route.params.id).then(user => {
        if (user) {
          user.own = false;
          return user;
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
}
