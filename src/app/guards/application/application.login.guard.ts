import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Injectable()
export class ApplicationLoginGuard {

  constructor (
    private _userService: UserService,
    private _router: Router
  )
  {}

  canActivate() {
    const token = this._userService.getToken();
    if (token) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
