import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AppealService} from '../../../services/appeal.service';
import {PunishmentService} from "../../../services/punishment.service";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";

@Injectable()
export class AppealMainGuard implements Resolve<boolean>{

  constructor (
    private punishmentService: PunishmentService,
    private userService: UserService,
    private router: Router
  )
  {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUserObservable().pipe(
      mergeMap(user =>
        forkJoin(
          [this.punishmentService.punishmentList(1, 100, {punished: user._id})]
        ).pipe(
          map(response => response[0].data.length > 0)
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of(false);
      })
    );
  }

}
