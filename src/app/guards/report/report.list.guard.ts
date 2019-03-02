import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ReportService} from '../../services/report.service';

@Injectable()
export class ReportListGuard {

  constructor (
    private _reportService: ReportService,
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
    if (route.params.type && (route.params.type === 'open') ||
      (route.params.type === 'closed') ||
      (route.params.type === 'waiting')) type = route.params.type;
    return this.dataSync(page, type).then((data) => {
      return data;
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

  async dataSync(page, type): Promise<any> {
    return {
      list: await this._reportService.report_list(page, type).then(response => {
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
      }),
      can_assign: await this._reportService.report_can_assign().then(response => {
        if (response) return response.can_assign;
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
    };
  }
}
