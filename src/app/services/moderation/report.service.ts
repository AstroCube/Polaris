import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {IReport, IReportAction} from "../../newModels/IReport";
import {IReportsPermissions} from "../../newModels/permissions/IReportsPermissions";
import {IPaginateResult} from "../../newModels/IModel";

@Injectable()
export class ReportService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }


  reportCreate(report: any): Observable<IReport> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "report/", report, {headers: headers}) as Observable<IReport>;
  }

  reportGet(id: string): Observable<IReport> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "report/" + id, {headers: headers}) as Observable<IReport>;
  }

  reportPermissions(): Observable<IReportsPermissions> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "report/actionable/permissions", {headers: headers}) as Observable<IReportsPermissions>;
  }

  reportAction(id: string, action: IReportAction): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "report/actionable/action/" + id, action, {headers: headers});
  }

  reportList(page: number, size: number, query?: any): Observable<IPaginateResult<IReport>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size));
    return this.http.post(GLOBAL.epsilon + "report/list", query, {headers, params}) as Observable<IPaginateResult<IReport>>;
  }

  reportAssign(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "report/actionable/assign/" + id, {headers: headers});
  }

}
