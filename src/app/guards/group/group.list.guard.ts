import {Injectable} from '@angular/core';
import {GroupService} from '../../services/group.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Injectable()
export class GroupListGuard {

  constructor (
    private _groupService: GroupService,
    private _userService: UserService,
    private _router: Router
  )
  {}

  async canActivate() {
    return await this._userService.permission_checker_promise("web_permissions.group.manage").then((permission) => {
      if (!permission.has_permission) {
        this._router.navigate(['/error'] , { queryParams: {type: "403"}});
        return false;
      } else {
        return true;
      }
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
  }

  resolve(): Promise<any> {
    return this.dataSync().then((groups) => {
      return groups;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
  }

  async dataSync(): Promise<any> {
    return {
      group: await this._groupService.groupList().then((groups) => {
        return groups;
      }),
      users: await this._userService.user_names().then((users) => {
        return users.fixed_users;
      })
    };
  }
}
