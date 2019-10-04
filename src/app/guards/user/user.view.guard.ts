import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Injectable()
export class UserViewGuard {

  constructor (
    private _userService: UserService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._userService.get_profile(route.params.username).then(user => {
      if (user) {
        return user;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "404"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "404"}});
      return false;
    });
  }

  
}
