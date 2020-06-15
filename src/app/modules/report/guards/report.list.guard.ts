import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ReportService} from '../../../services/report.service';
import {IReport, IReportList, IReportSearch} from "../../../newModels/IReport";
import {catchError, map, mergeMap} from "rxjs/operators";
import {forkJoin, Observable, of} from "rxjs";
import {ReportListComponent} from "../components/list/report.list.component";

@Injectable()
export class ReportListGuard implements Resolve<IReportList> {

  constructor (
    private reportService: ReportService,
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReportList> {
    const page = route.queryParams.page ? route.queryParams.page : 1;
    const parameter = route.queryParams.criteria ? route.queryParams.criteria : 'all';
    let search: IReportSearch = ReportListComponent.searchCriteria(parameter);
    return this.userService.getUserObservable().pipe(
      mergeMap(user =>
        forkJoin(
          this.reportService.reportList(page, 15, search),
          this.reportService.reportPermissions()
        ).pipe(
          map(response => ({
            user,
            reports: response[0],
            permissions: response[1]
          } as IReportList))
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
        return of({} as IReportList);
      })
    );
  }

}
