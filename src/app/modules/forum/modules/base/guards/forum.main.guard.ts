import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ForumService} from '../../../../../services/forum/forum.service';
import {IForumMain} from "../../../../../newModels/forum/IForum";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ForumMainGuard implements Resolve<IForumMain[]> {

  constructor (
    private forumService: ForumService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForumMain[]> {
    return this.forumService.main().pipe(
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of([]);
      })
    );
  }
}
