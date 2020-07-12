import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {TopicService} from '../../../../../services/forum/topic.service';
import {IForumView} from "../../../../../newModels/forum/IForum";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";
import {IUser} from "../../../../../newModels/user/IUser";

@Injectable()
export class ForumViewGuard implements Resolve<IForumView> {

  constructor (
    private forumService: ForumService,
    private forumUtilities: ForumUtilities,
    private topicService: TopicService,
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForumView> {
    return this.forumService.get(route.params.id).pipe(
      mergeMap(forum =>
        forkJoin([
          this.userService.getEpsilonToken() ? this.userService.getUserObservable() : of({} as IUser),
          this.topicService.list(route.queryParams.page || 1, 15, {forum: route.params.id}),
          this.topicService.list(-1, 10, {forum: route.params.id, pinned: true}, 'createdAt'),
          this.forumService.list(-1, 10, {parent: forum._id})
        ]).pipe(
          mergeMap(concat =>
            forkJoin([
              this.forumUtilities.getTopicHolders(concat[1].data, concat[0]),
              this.forumUtilities.getTopicHolders(concat[2].data, concat[0]),
              this.forumUtilities.getChildHolders(concat[3].data, concat[0])
            ]).pipe(
              map(topics => ({
                child: topics[2],
                forum,
                topic: topics[0],
                pinned: topics[1],
                pagination: concat[3].pagination
              }))
            )
          )
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IForumView);
      })
    );
  }

}