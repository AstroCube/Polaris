import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./global";
import {Forum} from '../models/forum/forum';

@Injectable()
export class GithubService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  /*getCommits(forum: Forum): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "forum/create", params, {headers: headers});
  }*/

}
