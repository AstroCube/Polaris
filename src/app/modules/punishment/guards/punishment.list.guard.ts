import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PunishmentService} from '../../../services/punishment.service';
import {IPunishment} from "../../../newModels/IPunishment";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {IPaginateResult} from "../../../newModels/IModel";
@Injectable()
export class PunishmentListGuard implements Resolve<IPaginateResult<IPunishment>> {

  constructor (
    private punishmentService: PunishmentService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaginateResult<IPunishment>> {
    let page = 1;
    if (route.params.page) page = route.params.page;
    return this.punishmentService.punishmentList(page, 15).pipe(
      map((response) => (response as IPaginateResult<IPunishment>)),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({data: [], pagination: {page: 1}} as IPaginateResult<IPunishment>);
      })
    );
  }
}
