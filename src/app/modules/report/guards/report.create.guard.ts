import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {IUser} from "../../../newModels/user/IUser";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";

@Injectable()
export class ReportCreateGuard implements Resolve<{user: IUser, ip: string}> {

  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{user: IUser, ip: string}> {
    return this.userService.getUserObservable(route.queryParams.user).pipe(
      mergeMap(user =>
        forkJoin(this.userService.userIp()).pipe(
          map(response => ({
            user,
            ip: response[0].ip
          }))
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
        return of({} as {user, ip});
      })
    );
  }

}
