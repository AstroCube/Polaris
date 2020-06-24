import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {IPunishment, IPunishmentCreateData} from "../../../newModels/IPunishment";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {GroupService} from "../../../services/group.service";
import {IReport} from "../../../newModels/IReport";
import {ReportService} from "../../../services/moderation/report.service";
import {IPaginateResult} from "../../../newModels/IModel";

@Injectable()
export class PunishmentCreateGuard implements CanActivate, Resolve<IPunishmentCreateData> {

  constructor (
    private userService: UserService,
    private groupService: GroupService,
    private reportService: ReportService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.groupService.permissionsManifest().pipe(
      map((response) => (
          response.punishments.manage ||
          response.punishments.create.warn || response.punishments.create.kick ||
          response.punishments.create.temp_ban || response.punishments.create.ban
      )),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
        return of(false);
      })
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IPunishmentCreateData> {
    let report: Observable<IReport> = route.queryParams.report  ? this.reportService.reportGet(route.queryParams.report) : of(null);
    report = report.pipe(
      catchError((err) => {
        return of(null as IReport);
      })
    );

    return this.groupService.permissionsManifest().pipe(
      mergeMap((permissions) =>
        forkJoin([report]).pipe(
          map(response => ({
            users: [],
            report: response[0],
            ban: permissions.punishments.manage || permissions.punishments.create.ban,
            tempBan: permissions.punishments.manage || permissions.punishments.create.temp_ban,
            kick: permissions.punishments.manage || permissions.punishments.create.kick,
            warn: permissions.punishments.manage || permissions.punishments.create.warn
          } as IPunishmentCreateData))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IPunishmentCreateData);
      })
    );
  }
}
