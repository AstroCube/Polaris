import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Forum} from '../../models/forum/forum';
import {Observable} from 'rxjs';
import {IPaginateResult} from "../../newModels/IModel";
import {IForum} from "../../newModels/forum/IForum";

@Injectable()
export class ForumService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  forum_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "forum/get/" + id, {headers: headers}).toPromise();
  }

  forum_pre_fetch(id: string, promise: boolean): any {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    if (!promise) return this.http.get(this.url + "forum/pre-fetch/" + id, {headers: headers});
    return this.http.get(this.url + "forum/pre-fetch/" + id, {headers: headers}).toPromise();
  }

  forum_admin_list(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "forum/admin-list", {headers: headers}).toPromise();
  }

  forum_admin_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "forum/admin-get/" + id, {headers: headers}).toPromise();
  }

  forum_tree(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "forum/tree", {headers: headers}).toPromise();
  }

  forum_update(id: string, forum: Forum): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.put(this.url + "forum/update/" + id, forum, {headers: headers});
  }

  forum_clear(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "forum/read-all/" + id, {headers: headers});
  }

  forum_main(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "forum/main", {headers: headers}).toPromise();
  }

  forumCreate(forum: IForum): Observable<IForum> {
    let params = JSON.stringify(forum);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "forum", params, {headers: headers}) as Observable<IForum>;
  }

  list(page?: number, size?: number, query?: any): Observable<IPaginateResult<IForum>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.post(GLOBAL.epsilon + "forum/list", query,{headers: headers, params}) as Observable<IPaginateResult<IForum>>;
  }

}
