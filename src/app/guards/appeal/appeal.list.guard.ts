import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AppealService} from '../../services/appeal.service';

@Injectable()
export class AppealListGuard {

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

  resolve(): Promise<any> {
    return this._appealService.appeal_main().then(response => {
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
