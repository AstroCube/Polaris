import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {CategoryService} from '../../../../../services/forum/category.service';
import {UserService} from '../../../../../services/user.service';
import {IForumCategory} from "../../../../../newModels/forum/IForumCategory";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class CategoryEditGuard implements Resolve<IForumCategory> {

  constructor (
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForumCategory> {
    return this.categoryService.get(route.params.id).pipe(
      catchError((error) => {
        this.router.navigate(['/error'], { queryParams: {type: error.status, message: error.error}});
        return of({} as IForumCategory);
      })
    );
  }

}
