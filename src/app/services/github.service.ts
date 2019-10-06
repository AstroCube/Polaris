import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./global";
import {CREDENTIALS} from './github';

@Injectable()
export class GithubService {

  public url: String;
  public credentials: any;

  constructor(
    private _http: HttpClient
  ){
    this.url = GLOBAL.url;
    this.credentials = CREDENTIALS;
  }

  getCommits(repo : string): Promise<any> {
    let auth = 'Basic ' + window.btoa(this.credentials.username + ":" + this.credentials.password);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', auth);
    return this._http.get("https://api.github.com/repos/" + this.credentials.group + "/" + repo +"/commits", {headers: headers}).toPromise();
  }

}
