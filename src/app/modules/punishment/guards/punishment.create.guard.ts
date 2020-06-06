import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {IPunishmentCreateData} from "../../../newModels/IPunishment";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {GroupService} from "../../../services/group.service";

@Injectable()
export class PunishmentCreateGuard implements CanActivate, Resolve<IPunishmentCreateData> {

  constructor (
    private userService: UserService,
    private groupService: GroupService,
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
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
        return of(false);
      })
    );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IPunishmentCreateData> {
    return this.groupService.permissionsManifest().pipe(
      map((response) => ({
        users: [],
        ban: response.punishments.manage || response.punishments.create.ban,
        tempBan: response.punishments.manage ||response.punishments.create.temp_ban,
        kick: response.punishments.manage || response.punishments.create.kick,
        warn: response.punishments.manage || response.punishments.create.warn
      } as IPunishmentCreateData)),
      catchError((err) => {
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
        return of({} as IPunishmentCreateData);
      })
    );
  }
}
