import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {IUser} from '../../../newModels/user/IUser';
import {UserService} from '../../../services/user.service';
import {forkJoin, Observable} from 'rxjs';
import {IUserProfileDiscord} from '../../../newModels/user/IUserProfile';

@Injectable()
export class UserEditGuard implements Resolve<{user: IUser, discord: IUserProfileDiscord}>{

  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const token = this.userService.getToken();
    if (token && token !== "none") {
      if (!route.params.id) {
        return true;
      } else {
        return this.userService.permission_checker("web_permissions.user.manage").pipe(map(
          response => {
            if (response.has_permission) {
              return true;
            } else {
              this.router.navigate(['/error'] , { queryParams: {type: "403"}});
              return false;
            }
          }
        ));
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Observable<{user: IUser, discord: IUserProfileDiscord}> {
    return this.userService.getUserObservable().pipe(
      mergeMap((user) =>
        forkJoin(
          this.userService.discordPlaceholder(user._id)
        ).pipe(
          map((response) => ({
            user: user,
            discord: response[0]
          }))
        )
      )
    );
  }
}
