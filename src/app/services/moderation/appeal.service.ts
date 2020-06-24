import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {IAppeal, IAppealAction, IAppealCreation} from "../../newModels/IAppeal";
import {IPaginateResult} from "../../newModels/IModel";
import {IAppealsPermissions} from "../../newModels/permissions/IAppealsPermissions";

@Injectable()
export class AppealService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  appealList(page: number, size: number, query?: any, own?: boolean): Observable<IPaginateResult<IAppeal>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size));
    if (own) params.set('own', String(own));
    return this.http.post(GLOBAL.epsilon + "appeal/list", query, {headers, params}) as Observable<IPaginateResult<IAppeal>>;
  }

  appealCreate(request: IAppealCreation): Observable<IAppeal> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "appeal/create", request, {headers}) as Observable<IAppeal>;
  }

  appealPermissions(): Observable<IAppealsPermissions> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "appeal/permissions",  {headers}) as Observable<IAppealsPermissions>;
  }

  appealGet(id: string): Observable<IAppeal> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "appeal/get/" + id,  {headers}) as Observable<IAppeal>;
  }

  appealAction(id: string, action: IAppealAction): Observable<IAppeal> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "appeal/action/" + id, action,{headers}) as Observable<IAppeal>;
  }

}
