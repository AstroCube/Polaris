import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PunishmentService} from '../../../services/punishment.service';
import {IPunishment, IPunishmentCreateData} from "../../../newModels/IPunishment";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {IPaginateResult} from "../../../newModels/IModel";
import {logger} from "codelyzer/util/logger";
import {IUser, IUserPlaceholder} from "../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../utilities/group-placeholder";
@Injectable()
export class PunishmentListGuard implements Resolve<IPaginateResult<IPunishment>> {

  constructor (
    private _punishmentService: PunishmentService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaginateResult<IPunishment>> {
    let page = 1;
    if (route.params.page) page = route.params.page;
    return this._punishmentService.punishmentList(page, 15).pipe(
      map((response) => (response as IPaginateResult<IPunishment>)),
      catchError((err) => {
        return of({} as IPaginateResult<IPunishment>);
      })
    );
  }
}
