import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {IUser} from '../../../newModels/user/IUser';
import {UserService} from '../../../services/user.service';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserProfileDiscord} from '../../../newModels/user/IUserProfile';
import {IPermissions} from "../../../newModels/IGroup";
import {GroupService} from "../../../services/group.service";

@Injectable()
export class UserLoggedGuard implements CanActivate {

  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const logged = this.userService.getToken() !== '' && this.userService.getEpsilonToken() !== '';
    if (!logged) this.router.navigate(['/login']);
    return logged;
  }

}
