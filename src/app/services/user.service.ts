import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {User} from '../models/user';

@Injectable()
export class UserService {
  public url: String;
  public identity;

  constructor(
    private _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  discord_logout(id: String): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.get(this.url +'discord-logout/' + id, {headers: headers});
  }

  discord_placeholder(id: String): Promise<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.get(this.url + 'discord-placeholder/' + id, {headers: headers}).toPromise();
  }

  discordPlaceholderObservable(id: String): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.get(this.url + 'discord-placeholder/' + id, {headers: headers});
  }

  login(request: any): Observable<any> {
    let params = JSON.stringify(request);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url + "user/login-website", params, {headers: headers});
  }

  get_user(id: string): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    if (!id) return this._http.get(this.url + "user/get-user", {headers: headers}).toPromise();
    return this._http.get(this.url + "user/get-user/" + id, {headers: headers}).toPromise();
  }

  getPrefix(id: string): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    if (!id) return this._http.get(this.url + "user/get-placeholder", {headers: headers}).toPromise();
    return this._http.get(this.url + "user/get-placeholder/" + id, {headers: headers}).toPromise();
  }

  mail_verification(id: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    return this._http.get(this.url + "user/email-verification/" + id, {headers: headers});
  }

  mail_update(request: any): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    return this._http.put(this.url + "user/email-update", request, {headers: headers});
  }

  update_user(id: string, user: User): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    if (!id) return this._http.put(this.url + "user/update-user", {user}, {headers: headers});
    return this._http.put(this.url + "user/update-user/" + id, {user},{headers: headers});
  }

  password_update(request: any): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    return this._http.post(this.url +'user/password-update', request, {headers: headers});
  }

  permission_checker(permission: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    return this._http.post(this.url + "user/permission-checker/", {permission: permission}, {headers: headers});
  }

  permission_checker_promise(permission: string): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    return this._http.post(this.url + "user/permission-checker/", {permission: permission}, {headers: headers}).toPromise();
  }

  token_validation(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    return this._http.get(this.url + "user/token-validation", {headers: headers});
  }

  userListAutocompleter(own: boolean): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    let route = "";
    if (own) route = "/true";
    return this._http.get(this.url + "user/list-names" + route, {headers: headers}).toPromise();
  }

  user_ip(): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get("https://api.ipify.org/?format=json", {headers: headers}).toPromise();
  }


  getToken() {
    let token = localStorage.getItem("token");
    if(token != "undefined") {
      this.identity = token;
    } else {
      this.identity = "none";
    }
    if (token === null) this.identity = "none";
    return this.identity;
  }

}
