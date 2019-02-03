import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {PunishmentService} from '../../services/punishment.service';
@Injectable()
export class PunishmentListGuard {

  constructor (
    private _punishmentService: PunishmentService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let page = 1;
    if (route.params.page) page = route.params.page;
    return this._punishmentService.punishment_list(page).then((response) => {
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
}
