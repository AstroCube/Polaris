import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {AppealService} from '../../../services/appeal.service';
import {IAppeal, IAppealList, IAppealSearch} from "../../../newModels/IAppeal";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {UserService} from "../../../services/user.service";
import {AppealGlobalComponent} from "../components/global/appeal.global.component";

@Injectable()
export class AppealGlobalGuard implements Resolve<IAppealList> {

  constructor (
    private appealService: AppealService,
    private userService: UserService,
    private router: Router
  )
  {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppealList> {
    const page = route.queryParams.page ? route.queryParams.page : 1;
    const parameter = route.queryParams.criteria ? route.queryParams.criteria : 'all';
    let search: IAppealSearch = AppealGlobalComponent.searchCriteria(parameter);
    return this.appealService.appealPermissions().pipe(
      mergeMap(permissions =>
        forkJoin(
          [this.userService.getUserObservable(),
          this.appealService.appealList(page, 15, search.query, search.own)]
        ).pipe(
          map(response => ({
            user: response[0],
            appeals: response[1],
            permissions: permissions
          }))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IAppealList);
      })
    );
  }
}
