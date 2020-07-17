import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {ITopic, ITopicEdit} from "../../../../../newModels/forum/ITopic";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {PostService} from "../../../../../services/forum/post.service";
import {IForum} from "../../../../../newModels/forum/IForum";
import {ForumPermissible} from "../../../../../newModels/permissions/IForumPermissions";

@Injectable()
export class TopicEditGuard implements CanActivate, Resolve<ITopicEdit> {

  constructor (
    private forumService: ForumService,
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.postService.get(route.params.id).pipe(
      mergeMap(post =>
        forkJoin([
          this.userService.getUserObservable(),
          this.forumService.permissions(((post.topic as ITopic).forum as IForum)._id)
        ]).pipe(
          map(response => {
            const date: Date = new Date(new Date(post.createdAt).getTime() + (15 * 60000));
            return (
              (response[1].globalAdmin || response[1].manage) ||
              (
                (
                  (response[1].edit === ForumPermissible.All) ||
                  (
                    response[0]._id && response[0]._id === (post.topic as ITopic).author._id &&
                    response[1].edit === ForumPermissible.Own &&
                    date.getTime() > new Date().getTime()
                  )
                )
              )
            );
          })
        )
      )
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITopicEdit> {
    return this.postService.get(route.params.id).pipe(
      mergeMap(post =>
        forkJoin([
          this.postService.list(
            -1,
            15,
            {topic: (post.topic as ITopic)._id},
            'createdAt'
          ),
          this.userService.getUserObservable()
        ]).pipe(
          map(response => ({
            original: response[0].data[0],
            user: response[1],
            post
          }))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as ITopicEdit);
      })
    );
  }

}
