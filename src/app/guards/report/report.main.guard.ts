import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Injectable()
export class ReportMainGuard {

  constructor (
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(): Promise<any> {
    return this._userService.userListAutocompleter(false).then((users) => {
      return users;
    }).catch((err) => {
      console.log(err);
      return null;
    });
  }
}
