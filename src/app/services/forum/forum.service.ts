import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {IPaginateResult} from "../../newModels/IModel";
import {IForum, IForumView} from "../../newModels/forum/IForum";
import {map} from "rxjs/operators";
import {IForumPermissions} from "../../newModels/permissions/IForumPermissions";

@Injectable()
export class ForumService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  create(forum: IForum): Observable<IForum> {
    let params = JSON.stringify(forum);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "forum", params, {headers: headers}) as Observable<IForum>;
  }

  list(page?: number, size?: number, query?: any): Observable<IPaginateResult<IForum>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.post(GLOBAL.epsilon + "forum/list", query,{headers: headers, params}) as Observable<IPaginateResult<IForum>>;
  }

  get(id: string): Observable<IForum> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/" + id, {headers: headers})
      .pipe(map(a => ({...a, _id: id}))) as Observable<IForum>;
  }

  view(id: string): Observable<IForumView> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/view/" + id, {headers: headers}) as Observable<IForumView>;
  }

  update(forum: IForum): Observable<IForum> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "forum", forum,{headers: headers}) as Observable<IForum>;
  }

  permissions(id: string): Observable<IForumPermissions> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/permissions/" + id, {headers: headers}) as Observable<IForumPermissions>;
  }

}
