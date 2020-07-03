import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {GroupService} from "../../../../../services/group.service";
import {map} from "rxjs/operators";

@Injectable()
export class CategoryPermissionsGuard implements CanActivate {

  constructor (
    private groupService: GroupService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.groupService.permissionsManifest().pipe(map(permissions => permissions.category.manage));
  }

}
