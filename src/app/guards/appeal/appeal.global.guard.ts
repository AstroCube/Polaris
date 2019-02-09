import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AppealService} from '../../services/appeal.service';

@Injectable()
export class AppealGlobalGuard {

  constructor (
    private _appealService: AppealService,
    private _userService: UserService,
    private _router: Router
  )
  {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let page = 1;
    if (route.params.page) page = route.params.page;
    let type = "all";
    if (route.queryParams.type) type = route.queryParams.type;
    return;
  }

  permissions(): Promise<any> {
    return;
  }

  dataSync(page, type): Promise<any> {
    return this._appealService.appeal_list(page, type).then(response => {
      if (response) {
        return response;
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
  }
}
