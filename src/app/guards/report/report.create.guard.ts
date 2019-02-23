import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ReportService} from '../../services/report.service';

@Injectable()
export class ReportCreateGuard {

  constructor (
    private _userService: UserService,
    private _reportService: ReportService,
    private _router: Router
  ) {}

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
    return this._reportService.report_pre_create(route.queryParams.user).then((users) => {
      return users;
    }).catch((err) => {
      console.log(err);
      return null;
    });
  }
}
