import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ForumService} from '../../../../../services/forum/forum.service';
import {forkJoin, Observable} from "rxjs";
import {GroupService} from "../../../../../services/group.service";
import {map, mergeMap} from "rxjs/operators";
import {CategoryService} from "../../../../../services/forum/category.service";
import {ICategoryTree} from "../../../../../newModels/forum/IForumCategory";

@Injectable()
export class ForumListGuard implements CanActivate, Resolve<ICategoryTree[]> {

  constructor (
    private forumService: ForumService,
    private categoryService: CategoryService,
    private groupService: GroupService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.groupService.permissionsManifest().pipe(map(permissions => permissions.forum.manage));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoryTree[]> {
    return this.categoryService.list().pipe(
      mergeMap(categories =>
        forkJoin(
          categories.data.map(category => this.forumService.list(-1, 10, {category: category._id}).pipe(
            map(forums => ({category, tree: forums.data}))
          ))
        )
      )
    );
  }

}
