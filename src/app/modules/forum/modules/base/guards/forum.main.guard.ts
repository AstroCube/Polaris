import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {IForumMain} from "../../../../../newModels/forum/IForum";
import {forkJoin, Observable, of} from "rxjs";
import {CategoryService} from "../../../../../services/forum/category.service";
import {catchError, mergeMap} from "rxjs/operators";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";
import {IUser} from "../../../../../newModels/user/IUser";

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
          [this.userService.getEpsilonToken() !== "" ? this.userService.getUserObservable() : of({} as IUser)]
        ).pipe(
          mergeMap(user =>
            forkJoin(
              categories.data.length > 0 ? categories.data.map(
              category => this.forumUtilities.getCategoryHolders(category, user[0])
              ) : of([])
            )
          )
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of([] as IForumMain[]);
      })
    );
  }
}
