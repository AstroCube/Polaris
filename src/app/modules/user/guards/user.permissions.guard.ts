import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';
import {Observable, of} from 'rxjs';
import {IPermissions} from "../../../newModels/IGroup";
import {GroupService} from "../../../services/group.service";

@Injectable()
export class UserPermissionsGuard implements Resolve<IPermissions> {

  constructor (
    private groupService: GroupService,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermissions> {
    if (this.userService.getEpsilonToken() !== '') {
      return this.groupService.permissionsManifest().pipe(map(permissionsManifest => permissionsManifest));
    } else {
      return of({} as IPermissions);
    }
  }
}
