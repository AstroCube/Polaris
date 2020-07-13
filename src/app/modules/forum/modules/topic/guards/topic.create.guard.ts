import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {IForum} from "../../../../../newModels/forum/IForum";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class TopicCreateGuard implements CanActivate, Resolve<IForum> {

  constructor (
    private forumService: ForumService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForum> {
    return this.forumService.get(route.queryParams.forum).pipe(
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IForum);
      })
    );
  }

}
