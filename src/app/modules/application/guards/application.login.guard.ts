import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Observable} from "rxjs";

@Injectable()
export class ApplicationLoginGuard implements CanActivate {

  constructor (
    private userService: UserService,
    private router: Router
  )
  {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.userService.getEpsilonToken() === "";
  }

}
