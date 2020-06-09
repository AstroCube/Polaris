import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AppealService} from '../../../services/appeal.service';
import {IAppealMain} from "../../../newModels/IAppeal";
import {forkJoin, Observable, of} from "rxjs";
import {PunishmentService} from "../../../services/punishment.service";
import {catchError, map, mergeMap} from "rxjs/operators";

@Injectable()
export class AppealListGuard implements Resolve<IAppealMain>{

  constructor (
    private appealService: AppealService,
    private punishmentService: PunishmentService,
    private userService: UserService,
    private router: Router
  )
  {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppealMain> {
    return this.userService.getUserObservable().pipe(
      mergeMap(user =>
        forkJoin(
          this.punishmentService.punishmentList(-1, 1, {punished: user._id, appealed: false}),
          this.appealService.appealList(-1, 1, {}, true),
          this.userService.userIp()
        ).pipe(
          map(response => ({
            user,
            punishments: response[0].data,
            appeals: response[1].data,
            ip: response[2].ip
          } as IAppealMain))
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
        return of({} as IAppealMain);
      })
    );
  }

}
