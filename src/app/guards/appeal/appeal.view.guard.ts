import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AppealService} from '../../services/appeal.service';

@Injectable()
export class AppealViewGuard {

  constructor (
    private _appealService: AppealService,
    private _userService: UserService,
    private _router: Router
  )
  {}

  canActivate(route: ActivatedRouteSnapshot) {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this.permission(route).then((permissions) => {
        if (permissions.view) {
          return true;
        } else {
          this._router.navigate(['/error'], {queryParams: {type: "403"}});
          return false;
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.preFetch(route).then((response) => {
      return response;
    }).catch((err) => {
      console.log(err);
    });
  }

  async preFetch(route: ActivatedRouteSnapshot): Promise<any> {
    return {
      permissions: await this.permission(route).then((permission) => {
        return permission;
      }).catch((err) => {
        console.log(err);
      }),
      appeal: await this._appealService.appeal_get(route.params.id).then((appeal) => {
        return appeal;
      }).catch((err) => {
        console.log(err);
      })
    };
  }

  async permission(route: ActivatedRouteSnapshot): Promise<any> {
    return await this._appealService.appeal_permissions(route.params.id).then((permissions) => {
      return permissions.permissions;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'], {queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'], {queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'], {queryParams: {type: "500"}});
          return false;
        }
      }
    });
  }
}
