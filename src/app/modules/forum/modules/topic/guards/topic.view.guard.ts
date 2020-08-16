import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {TopicService} from '../../../../../services/forum/topic.service';
import {ITopicView} from "../../../../../newModels/forum/ITopic";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {PostService} from "../../../../../services/forum/post.service";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";
import {ForumPermissible, IForumPermissions} from "../../../../../newModels/permissions/IForumPermissions";

@Injectable()
export class TopicViewGuard implements CanActivate, Resolve<ITopicView>{

  constructor (
    private forumService: ForumService,
    private topicService: TopicService,
    private userService: UserService,
    private postService: PostService,
    private forumUtilities: ForumUtilities,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getPermissions(route.params.id).pipe(map(p => p.view !== ForumPermissible.None));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITopicView> {
    return this.topicService.view(route.params.id, route.queryParams.page || 1, 15).pipe(
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as ITopicView);
      })
    );
  }

  public getPermissions(topic: string): Observable<IForumPermissions> {
    return this.userService.getEpsilonToken() !== "" ?
      this.forumService.permissions(topic) :
      this.forumUtilities.getGuestPermissions(topic);
  }

}
