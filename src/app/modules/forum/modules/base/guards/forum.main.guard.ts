import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {IForumMain} from "../../../../../newModels/forum/IForum";
import {forkJoin, Observable, of} from "rxjs";
import {CategoryService} from "../../../../../services/forum/category.service";
import {catchError, mergeMap} from "rxjs/operators";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";

@Injectable()
export class ForumMainGuard implements Resolve<IForumMain[]> {

  constructor (
    private forumService: ForumService,
    private forumUtilities: ForumUtilities,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForumMain[]> {
    return this.categoryService.list().pipe(
      mergeMap(categories =>
        forkJoin(
          categories.data.map(
            category => this.forumUtilities.getCategoryHolders(category))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of([] as IForumMain[]);
      })
    );
  }
}
