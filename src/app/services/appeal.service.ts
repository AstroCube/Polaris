import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { GLOBAL } from "./global";
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable()
export class AppealService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  appeal_main(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/main", {headers: headers}).toPromise();
  }

  appeal_create(request: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "appeal/create", request,{headers: headers});
  }

  appeal_permissions(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "appeal/permissions/" + id, {headers: headers}).toPromise();
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

}
