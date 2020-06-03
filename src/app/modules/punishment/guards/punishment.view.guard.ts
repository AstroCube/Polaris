import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PunishmentService} from '../../../services/punishment.service';
import {catchError, map} from "rxjs/operators";
import {IPaginateResult} from "../../../newModels/IModel";
import {IPunishment} from "../../../newModels/IPunishment";
import {Observable, of} from "rxjs";

@Injectable()
export class PunishmentViewGuard implements Resolve<IPunishment>{

  constructor (
    private _punishmentService: PunishmentService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPunishment> {
    return this._punishmentService.punishmentGet(route.params.id).pipe(
      map((response) => (response as IPunishment)),
      catchError((err) => {
        return of({} as IPunishment);
      })
    );
  }
}