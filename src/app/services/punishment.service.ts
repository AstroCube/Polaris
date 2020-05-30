import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "./global";
import {UserService} from './user.service';
import {Punishment} from '../models/punishment';
import {Observable} from 'rxjs';
import {IPunishment} from "../newModels/IPunishment";
import {IPaginateResult} from "../newModels/IModel";

@Injectable()
export class PunishmentService {

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){}

  punishmentCreate(punishment: IPunishment): Observable<IPunishment> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getEpsilonToken());
    return this._http.post(GLOBAL.epsilon + "punishment/create", punishment, {headers: headers}) as Observable<IPunishment>;
  }

  punishment_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(GLOBAL.epsilon + "punishment/get/" + id, {headers: headers}).toPromise();
  }

  punishment_update(id: string, punishment: Punishment): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put(GLOBAL.epsilon + "punishment/update/" + id, punishment, {headers: headers});
  }

  punishmentList(page?: number, size?: number): Observable<IPaginateResult<IPunishment>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this._http.get(
      GLOBAL.epsilon + "punishment/list",
      {
        headers: headers,
        params: params
      }) as Observable<IPaginateResult<IPunishment>>;
  }

  punishmentUserList(user: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(GLOBAL.epsilon + "punishment/user/" + user,{headers: headers});
  }

}
