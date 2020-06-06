import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GroupService} from "../../../services/group.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
@Injectable()
export class PunishmentEditGuard implements CanActivate {

  constructor (
    private groupService: GroupService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.groupService.permissionsManifest().pipe(
      map((permissions) => {
        if (!permissions.punishments.manage) this.router.navigate(['/error'] , { queryParams: {type: "403"}});
        return permissions.punishments.manage;
      })
    );
  }

}
