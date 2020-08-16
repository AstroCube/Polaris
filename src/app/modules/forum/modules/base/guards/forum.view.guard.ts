import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ForumService} from '../../../../../services/forum/forum.service';
import {IForumView} from "../../../../../newModels/forum/IForum";
import { Observable} from "rxjs";

@Injectable()
export class ForumViewGuard implements Resolve<IForumView> {

  constructor (
    private forumService: ForumService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForumView> {
    return this.forumService.view(route.params.id, route.params.page || 1, 15);
  }

}
