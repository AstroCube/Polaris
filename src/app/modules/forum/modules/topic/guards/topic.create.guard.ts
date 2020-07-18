import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ITopicCreate} from "../../../../../newModels/forum/ITopic";

@Injectable()
export class TopicCreateGuard implements CanActivate, Resolve<ITopicCreate> {

  constructor (
    private forumService: ForumService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.forumService.permissions(route.queryParams.forum).pipe(map(f => {
      return f.create || f.globalAdmin || f.manage;
    }));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITopicCreate> {
    return this.forumService.get(route.queryParams.forum).pipe(
      mergeMap(forum =>
        forkJoin([
          this.forumService.permissions(forum._id),
          this.userService.getUserObservable()
        ]).pipe(
          map(response => ({
            forum,
            permissions: response[0],
            user: response[1]
          }))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as ITopicCreate);
      })
    );
  }

}
