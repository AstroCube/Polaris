import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ForumService} from '../../../../../services/forum/forum.service';
import {IForum} from "../../../../../newModels/forum/IForum";
import {Observable} from "rxjs";

@Injectable()
export class ForumEditGuard implements Resolve<IForum>{

  constructor (
    private forumService: ForumService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IForum>  {
    return this.forumService.get(route.params.id);
  }

}
