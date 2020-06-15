import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {UserService} from './user.service';
import {IReport, IReportAction} from "../newModels/IReport";
import {IReportsPermissions} from "../newModels/permissions/IReportsPermissions";
import {IPaginateResult} from "../newModels/IModel";
import {IAppeal} from "../newModels/IAppeal";

@Injectable()
export class ReportService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }


  reportCreate(report: any): Observable<IReport> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this._http.post(GLOBAL.epsilon + "report/create", report, {headers: headers}) as Observable<IReport>;
  }

  reportGet(id: string): Observable<IReport> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this._http.get(GLOBAL.epsilon + "report/get/" + id, {headers: headers}) as Observable<IReport>;
  }

  reportPermissions(): Observable<IReportsPermissions> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this._http.get(GLOBAL.epsilon + "report/permissions", {headers: headers}) as Observable<IReportsPermissions>;
  }

  reportAction(id: string, action: IReportAction): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this._http.put(GLOBAL.epsilon + "report/action/" + id, action, {headers: headers});
  }

  reportList(page: number, size: number, query?: any): Observable<IPaginateResult<IReport>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size));
    return this._http.post(GLOBAL.epsilon + "report/list", query, {headers, params}) as Observable<IPaginateResult<IReport>>;
  }

  report_assign(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this._http.get(this.url + "report/assign/" + id, {headers: headers});
  }

}
