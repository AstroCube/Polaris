import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {TopicService} from '../../../../../services/forum/topic.service';
import {ITopicReply} from "../../../../../newModels/forum/ITopic";
import {forkJoin, Observable, of} from "rxjs";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";
import {catchError, map, mergeMap} from "rxjs/operators";
import {IForum} from "../../../../../newModels/forum/IForum";
import {PostService} from "../../../../../services/forum/post.service";
import {ForumPermissible} from "../../../../../newModels/permissions/IForumPermissions";

@Injectable()
export class TopicReplyGuard implements CanActivate, Resolve<ITopicReply> {

  constructor (
    private forumService: ForumService,
    private topicService: TopicService,
    private userService: UserService,
    private forumUtilities: ForumUtilities,
    private postService: PostService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.topicService.get(route.params.id).pipe(
      mergeMap(topic =>
        forkJoin([
          this.userService.getUserObservable(),
          this.forumService.permissions((topic.forum as IForum)._id)
        ]).pipe(
          map(response => {
            return (
              (
                response[1].globalAdmin || response[1].manage) ||
              (
                (!topic.locked) &&
                (
                  (response[1].comment === ForumPermissible.All) ||
                  (response[0]._id && response[0]._id === topic.author._id && response[1].comment === ForumPermissible.Own)
                )
              )
            );
          })
        )
      )
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITopicReply> {
    return this.topicService.get(route.params.id).pipe(
      mergeMap(topic =>
        forkJoin([
          route.queryParams.quote ? this.postService.get(route.queryParams.quote) : of(null),
          this.userService.getUserObservable(),
          this.postService.list(-1, 10, {topic: topic._id}, 'createdAt')
        ]).pipe(
          map(response => ({
            topic,
            quote: response[0],
            user: response[1],
            original: response[2].data[0]
          }))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as ITopicReply);
      })
    );
  }

}
