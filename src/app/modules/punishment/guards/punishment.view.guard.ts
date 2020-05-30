import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {PunishmentService} from '../../../services/punishment.service';

@Injectable()
export class PunishmentViewGuard {

  constructor (
    private _punishmentService: PunishmentService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._punishmentService.punishment_get(route.params.id).then(punishment => {
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
    });
  }
}
