import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {IPunishmentCreateData} from "../../../newModels/IPunishment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class PunishmentCreateGuard implements Resolve<IPunishmentCreateData> {

  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  canActivate() {
    const token = this.userService.getEpsilonToken();
    if (token && token !== "none") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IPunishmentCreateData> {
    return this.userService.userListAutocompleteObservable(false).pipe(
      map((response) => ({
        users: response,
        ban: true,
        tempBan: true,
        kick: true,
        warn: true
      } as IPunishmentCreateData))
    );
  }
}
