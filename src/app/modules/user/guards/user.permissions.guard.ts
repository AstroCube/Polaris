import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {IUser} from '../../../newModels/user/IUser';
import {UserService} from '../../../services/user.service';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserProfileDiscord} from '../../../newModels/user/IUserProfile';
import {IPermissions} from "../../../newModels/IGroup";
import {GroupService} from "../../../services/group.service";

@Injectable()
export class UserPermissionsGuard implements Resolve<IPermissions>{

  constructor (
    private groupService: GroupService,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPermissions> {
    const token = this.userService.getToken();
    if (token && token !== "none") {
      return this.groupService.permissionsManifest().pipe(map(permissionsManifest => permissionsManifest));
    } else {
      return of({} as IPermissions);
    }
  }
}
