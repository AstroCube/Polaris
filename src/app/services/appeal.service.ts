import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "./global";
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {IAppeal, IAppealCreation} from "../newModels/IAppeal";
import {IPaginateResult} from "../newModels/IModel";

@Injectable()
export class AppealService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  appealList(page: number, size: number, query?: any, own?: boolean): Observable<IPaginateResult<IAppeal>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size));
    if (own) params.set('own', String(own));
    return this._http.post(GLOBAL.epsilon + "appeal/list", query, {headers, params}) as Observable<IPaginateResult<IAppeal>>;
  }

  appealCreate(request: IAppealCreation): Observable<IAppeal> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getEpsilonToken());
    return this._http.post(GLOBAL.epsilon + "appeal/list", request, {headers}) as Observable<IAppeal>;
  }

  appeal_permissions(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/permissions/" + id, {headers: headers}).toPromise();
  }

  appeal_list_permission(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/list-permissions/", {headers: headers}).toPromise();
  }

  appeal_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/get/" + id, {headers: headers}).toPromise();
  }

  appeal_comment(id: string, comment: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "appeal/comment/" + id, {comment: comment}, {headers: headers});
  }

  appeal_status(id: string, comment: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "appeal/status/" + id, {comment: comment}, {headers: headers});
  }

  appeal_lock(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/lock/" + id, {headers: headers});
  }

  appeal_close(id: string, comment: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "appeal/close/" + id, {comment: comment},  {headers: headers});
  }

  appeal_escalate(id: string, comment: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "appeal/escalate/" + id, {comment: comment},  {headers: headers});
  }

  appeal_list(page: number, type: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/list/" + page + "/" + type, {headers: headers}).toPromise();
  }

  appeal_assign(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/assign-escalated/" + id, {headers: headers});
  }

}
