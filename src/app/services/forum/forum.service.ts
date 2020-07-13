import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Forum} from '../../models/forum/forum';
import {Observable} from 'rxjs';
import {IPaginateResult} from "../../newModels/IModel";
import {IForum} from "../../newModels/forum/IForum";
import {map} from "rxjs/operators";

@Injectable()
export class ForumService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }
  forum_pre_fetch(id: string, promise: boolean): any {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    if (!promise) return this.http.get(this.url + "forum/pre-fetch/" + id, {headers: headers});
    return this.http.get(this.url + "forum/pre-fetch/" + id, {headers: headers}).toPromise();
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

  update(forum: IForum): Observable<IForum> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "forum", forum,{headers: headers}) as Observable<IForum>;
  }

}
