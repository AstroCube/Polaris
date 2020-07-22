import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {ForumService} from '../../../../../services/forum/forum.service';
import {TopicService} from '../../../../../services/forum/topic.service';
import {IForumView} from "../../../../../newModels/forum/IForum";
import {forkJoin, Observable, of} from "rxjs";
import {ForumUtilities} from "../../../../../utilities/forum-utilities";

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
    return this.forumService.view(route.params.id);
  }

}
