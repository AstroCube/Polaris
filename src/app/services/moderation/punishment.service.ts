import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {IPunishment} from "../../newModels/IPunishment";
import {IPaginateResult} from "../../newModels/IModel";

@Injectable()
export class PunishmentService {

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){}

  punishmentCreate(punishment: IPunishment, report?: string): Observable<IPunishment> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getEpsilonToken());
    const params = new HttpParams().set('report', report ? report : undefined);
    return this._http.post(GLOBAL.epsilon + "punishment/create-website", punishment, {headers: headers, params: params}) as Observable<IPunishment>;
  }

  punishmentGet(id: string): Observable<IPunishment> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('populate', 'issuer punished');
    return this._http.get(GLOBAL.epsilon + "punishment/" + id, {headers: headers, params}) as Observable<IPunishment>;
  }

  punishmentUpdate(punishment: IPunishment): Observable<IPunishment> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getEpsilonToken());
    return this._http.put(GLOBAL.epsilon + "punishment/update", punishment, {headers: headers}) as Observable<IPunishment>;
  }

  punishmentList(page?: number, size?: number, query?: any): Observable<IPaginateResult<IPunishment>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('page', String(page)).set('size', String(size)).set('populate', 'issuer punished');
    return this._http.post(
      GLOBAL.epsilon + "punishment/list",
      query,
      {
        headers: headers,
        params: params
      }) as Observable<IPaginateResult<IPunishment>>;
  }

}
