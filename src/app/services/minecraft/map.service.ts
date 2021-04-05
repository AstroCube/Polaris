import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from '../user.service';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs';
import {IPaginateResult} from "../../newModels/IModel";
import {IAppeal} from "../../newModels/IAppeal";
import {IMap} from "../../newModels/IMap";
import {map} from 'rxjs/operators';

@Injectable()
export class MapService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  get(id: string): Observable<IMap> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(GLOBAL.epsilon + "map/" + id, {headers, params: {populate: "author"}}) as Observable<IMap>;
  }

  list(page: number, size: number, query?: any): Observable<IPaginateResult<IMap>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size)).set('populate', 'author');
    return this.http.post(GLOBAL.epsilon + "map/list-web", query, {headers, params}) as Observable<IPaginateResult<IMap>>;
  }

}
