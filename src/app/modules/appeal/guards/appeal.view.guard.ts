import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AppealService} from '../../../services/appeal.service';
import {IAppeal, IAppealResolve} from "../../../newModels/IAppeal";
import {catchError, map, mergeMap} from "rxjs/operators";
import {forkJoin, Observable, of} from "rxjs";

@Injectable()
export class AppealViewGuard implements Resolve<IAppealResolve> {

  constructor (
    private appealService: AppealService,
    private userService: UserService,
    private router: Router
  )
  {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppealResolve> {
    return this.userService.getUserObservable().pipe(
      mergeMap(user =>
        forkJoin(
          [this.appealService.appealPermissions(),
          this.appealService.appealGet(route.params.id)]
        ).pipe(
          map(response => ({
            user: user,
            permissions: response[0],
            appeal: response[1]
          }))
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IAppealResolve);
      })
    );
  }


}
