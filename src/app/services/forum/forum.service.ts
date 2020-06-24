import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Forum} from '../../models/forum/forum';
import {Observable} from 'rxjs';

@Injectable()
export class ForumService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  forum_create(forum: Forum): Observable<any> {
    let params = JSON.stringify(forum);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "forum/create", params, {headers: headers});
  }

  forum_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "forum/get/" + id, {headers: headers}).toPromise();
  }

  forum_pre_fetch(id: string, promise: boolean): any {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    if (!promise) return this._http.get(this.url + "forum/pre-fetch/" + id, {headers: headers});
    return this._http.get(this.url + "forum/pre-fetch/" + id, {headers: headers}).toPromise();
  }

  forum_admin_list(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "forum/admin-list", {headers: headers}).toPromise();
  }

  forum_admin_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "forum/admin-get/" + id, {headers: headers}).toPromise();
  }

  forum_tree(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "forum/tree", {headers: headers}).toPromise();
  }

  forum_update(id: string, forum: Forum): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put(this.url + "forum/update/" + id, forum, {headers: headers});
  }

  forum_clear(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "forum/read-all/" + id, {headers: headers});
  }

  forum_main(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "forum/main", {headers: headers}).toPromise();
  }

}
