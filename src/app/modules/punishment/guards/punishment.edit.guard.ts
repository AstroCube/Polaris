import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {PunishmentService} from '../../../services/punishment.service';
@Injectable()
export class PunishmentEditGuard {

  constructor (
    private _userService: UserService,
    private _punishmentService: PunishmentService,
    private _router: Router
  ) {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this._userService.permission_checker_promise("web_permissions.punishments.manage").then((response) => {
        if (response.has_permission) {
          return true;
        } else {
          return false;
        }
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
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._punishmentService.punishmentGet(route.params.id).toPromise().then(punishment => {
      if (punishment) {
        return punishment;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "404"}});
        return false;
      }
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
    })
  }

}
