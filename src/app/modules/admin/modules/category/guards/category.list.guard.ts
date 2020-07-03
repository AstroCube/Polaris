import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {CategoryService} from '../../../../../services/forum/category.service';
import {IPaginateResult} from "../../../../../newModels/IModel";
import {IForumCategory} from "../../../../../newModels/forum/IForumCategory";
import {Observable, of} from "rxjs";
import {GroupService} from "../../../../../services/group.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class CategoryListGuard implements Resolve<IPaginateResult<IForumCategory>>{

  constructor (
    private groupService: GroupService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaginateResult<IForumCategory>>{
    return this.categoryService.list().pipe(
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({data: [], pagination: {page: 1}} as IPaginateResult<IForumCategory>);
      })
    );
  }


}
