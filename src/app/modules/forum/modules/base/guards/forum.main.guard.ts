import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum.service';

@Injectable()
export class ForumMainGuard {

  constructor (
    private _forumService: ForumService,
    private _userService: UserService,
    private _router: Router
  ) {}

  resolve(): Promise<any> {
    return this._forumService.forum_main().then((forum) => {
      return forum;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
  }
}
