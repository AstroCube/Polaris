import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
@Injectable()
export class PunishmentCreateGuard {

  constructor (
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this.dataPromise().then((response) => {
        if (response.manage || response.warn || response.kick || response.temp_ban || response.ban) {
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

  resolve(): Promise<any> {
    return this.dataFinal().then((response) => {
      return response;
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
  }

  async dataFinal(): Promise<any> {
    return {
      permissions: await this.dataPromise().then((response) => {
        return response;
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
      }),
      list: await this._userService.user_names().then((users) => {
        return users;
      }).catch((err) => {
        console.log(err);
        return null;
      })
    }
  }

  async dataPromise(): Promise<any> {
    return {
      manage: await this._userService.permission_checker_promise("web_permissions.punishments.manage").then((permission) => {
        return permission;
      }).catch((err) => {
        console.log(err);
      }),
      warn: await this._userService.permission_checker_promise("web_permissions.punishments.create.warn").then((permission) => {
        return permission;
      }).catch((err) => {
        console.log(err);
      }),
      kick: await this._userService.permission_checker_promise("web_permissions.punishments.create.kick").then((permission) => {
        return permission;
      }).catch((err) => {
        console.log(err);
      }),
      temp_ban: await this._userService.permission_checker_promise("web_permissions.punishments.create.temp_ban").then((permission) => {
        return permission;
      }).catch((err) => {
        console.log(err);
      }),
      ban: await this._userService.permission_checker_promise("web_permissions.punishments.create.ban").then((permission) => {
        return permission;
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
