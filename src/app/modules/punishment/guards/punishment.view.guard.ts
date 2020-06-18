import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PunishmentService} from '../../../services/punishment.service';
import {catchError, map} from "rxjs/operators";
import {IPunishment} from "../../../newModels/IPunishment";
import {Observable, of} from "rxjs";

@Injectable()
export class PunishmentViewGuard implements Resolve<IPunishment>{

  constructor (
    private punishmentService: PunishmentService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPunishment> {
    return this.punishmentService.punishmentGet(route.params.id).pipe(
      map((response) => (response as IPunishment)),
      catchError((err) => {
        this.router.navigate(['/error'] , { queryParams: {type: "403"}});
        return of({} as IPunishment);
      })
    );
  }
}
