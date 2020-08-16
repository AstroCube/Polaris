import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {MatchService} from '../../../services/minecraft/match.service';
import {IMatch} from "../../../newModels/match/IMatch";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {IReportView} from "../../../newModels/IReport";

@Injectable()
export class MatchViewGuard implements Resolve<IMatch>{

  constructor (
    private matchService: MatchService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMatch> {
    return this.matchService.match(route.params.id).pipe(
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IMatch);
      })
    );
  }

}
