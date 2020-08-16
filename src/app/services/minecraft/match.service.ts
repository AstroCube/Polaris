import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from '../user.service';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs';
import {Match} from '../../models/minecraft/match';
import {IMatchProfile} from '../../newModels/match/IMatchProfile';
import {IMatch} from "../../newModels/match/IMatch";
import {IPaginateResult} from "../../newModels/IModel";

@Injectable()
export class MatchService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
  }

  match(id: string): Observable<IMatch> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "match/" + id, {headers: headers}) as Observable<IMatch>;
  }

  list(query?: any, page?: number, perPage?: number): Observable<IPaginateResult<IMatch>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(perPage))
      .set('populate', 'gamemode');
    return this.http.post(GLOBAL.epsilon + "match/list", query, {headers, params}) as Observable<IPaginateResult<IMatch>>;
  }

}
