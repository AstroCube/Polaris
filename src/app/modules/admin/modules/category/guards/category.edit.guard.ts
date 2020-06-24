import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {CategoryService} from '../../../../../services/forum/category.service';
import {map} from 'rxjs/operators';
import {UserService} from '../../../../../services/user.service';

@Injectable()
export class CategoryEditGuard {

  constructor (
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _router: Router
  ) {}

  canActivate() {
    const token = this._userService.getToken();
    if (token && token !== "none") {
      return this._userService.permission_checker("web_permissions.category.manage").pipe(map(
        response => {
          if (response.has_permission) {
            return true;
          } else {
            this._router.navigate(['/error'] , { queryParams: {type: "403"}});
            return false;
          }
        }
      ));
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._categoryService.category_get(route.params.id).then(response => {
      if (response) {
        if (response.not_found) {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        } else {
          return response;
        }
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    });
  }
}
