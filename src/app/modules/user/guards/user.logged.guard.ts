import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';

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
