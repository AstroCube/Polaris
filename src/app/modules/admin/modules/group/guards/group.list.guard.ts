import {Injectable} from '@angular/core';
import {GroupService} from '../../../../../services/group.service';
import {UserService} from '../../../../../services/user.service';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IGroup} from "../../../../../newModels/IGroup";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {IAppealResolve} from "../../../../../newModels/IAppeal";
import {IPaginateResult} from "../../../../../newModels/IModel";

@Injectable()
export class GroupListGuard implements CanActivate, Resolve<IPaginateResult<IGroup>> {

  constructor (
    private groupService: GroupService,
    private userService: UserService,
    private router: Router
  )
  {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.groupService.permissionsManifest().pipe(map(p => p.group.manage));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaginateResult<IGroup>> {
    return this.groupService.groupList().pipe(
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IPaginateResult<IGroup>);
      })
    );
  }


}
