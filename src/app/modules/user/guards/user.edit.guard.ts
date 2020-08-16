import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {IUser} from '../../../newModels/user/IUser';
import {UserService} from '../../../services/user.service';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserProfileDiscord} from '../../../newModels/user/IUserProfile';

@Injectable()
export class UserEditGuard implements Resolve<{user: IUser, discord: IUserProfileDiscord}>{

  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{user: IUser, discord: IUserProfileDiscord}> {
    return this.userService.getUser().pipe(
      map((response) => ({
        user: response,
        discord: null
      })),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as {user: IUser, discord: IUserProfileDiscord});
      })
    );
  }
}
