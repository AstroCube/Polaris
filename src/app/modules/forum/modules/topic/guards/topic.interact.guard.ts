import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {TopicService} from '../../../../../services/forum/topic.service';
import {ITopicInteraction} from "../../../../../newModels/forum/ITopic";
import {Observable, of} from "rxjs";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";
import {catchError} from "rxjs/operators";
import {PostService} from "../../../../../services/forum/post.service";

@Injectable()
export class TopicInteractGuard implements  Resolve<ITopicInteraction> {

  constructor (
    private forumService: ForumService,
    private topicService: TopicService,
    private userService: UserService,
    private forumUtilities: ForumUtilities,
    private postService: PostService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITopicInteraction> {
    return this.topicService.interaction(route.params.id, route.queryParams.interact).pipe(
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as ITopicInteraction);
      })
    );
  }

}
