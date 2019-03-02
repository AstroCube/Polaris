import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {UserService} from './user.service';

@Injectable()
export class ReportService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  report_pre_create(username: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "report/pre-create", {username: username}, {headers: headers}).toPromise();
  }

  report_create(report: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "report/create", report, {headers: headers});
  }

  report_permissions(id: any): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "report/permissions/" + id, {headers: headers}).toPromise();
  }

  report_view(id: any): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "report/view/" + id, {headers: headers}).toPromise();
  }

  report_comment(id: any, content: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "report/comment/" + id, {content: content}, {headers: headers});
  }

  report_close(id: any, content: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "report/close/" + id, {content: content}, {headers: headers});
  }

  report_assign(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "report/assign/" + id, {headers: headers});
  }

  report_get_punish(id: any): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "report/get-punish/" + id, {headers: headers}).toPromise();
  }

  report_can_assign(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "report/can-assign", {headers: headers}).toPromise();
  }

  report_list(page: number, type: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "report/list/" + page + "/" + type, {headers: headers}).toPromise();
  }

}
