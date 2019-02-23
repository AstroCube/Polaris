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

}
