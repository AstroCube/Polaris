import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from '../user.service';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs';
import {IPaginateResult} from "../../newModels/IModel";
import {IAppeal} from "../../newModels/IAppeal";
import {IMap} from "../../newModels/IMap";
import {IGamemode} from "../../newModels/IGamemode";

@Injectable()
export class GamemodeService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  get(id: string): Observable<IGamemode> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "gamemode/" + id, {headers}) as Observable<IGamemode>;
  }

  list(page: number, size: number, query?: any): Observable<IPaginateResult<IGamemode>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size));
    return this.http.post(GLOBAL.epsilon + "gamemode/list", query, {headers, params}) as Observable<IPaginateResult<IGamemode>>;
  }

}
