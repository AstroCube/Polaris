import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ReportService} from '../../../services/moderation/report.service';
import {IReport, IReportView} from "../../../newModels/IReport";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {IReportsPermissions} from "../../../newModels/permissions/IReportsPermissions";

@Injectable()
export class ReportViewGuard implements Resolve<IReportView> {

  constructor (
    private reportService: ReportService,
    private userService: UserService,
    private router: Router
  )
  {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReportView> {
    return this.reportService.reportPermissions().pipe(
      mergeMap(permissions =>
        forkJoin(
          [this.userService.getUserObservable(),
          this.reportService.reportGet(route.params.id)]
        ).pipe(
          map(response => ({
            user: response[0],
            report: response[1],
            permissions: permissions
          }))
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IReportView);
      })
    );
  }

}
