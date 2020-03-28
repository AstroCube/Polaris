import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {User} from '../models/user';
import {IMailUpdateVerification, IPasswordUpdate, IUser} from '../newModels/user/IUser';
import {IUserProfileDiscord} from '../newModels/user/IUserProfile';

@Injectable()
export class UserService {
  public url: String;
  public identity;
  public epsilon;

  constructor(
    private _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  discord_logout(id: String): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.get(this.url +'discord-logout/' + id, {headers: headers});
  }

  discordPlaceholder(id: String): Observable<IUserProfileDiscord>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.get(this.url + 'discord-placeholder/' + id, {headers: headers}) as Observable<IUserProfileDiscord>;
  }

  discord_placeholder(id: String): Promise<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
    return this._http.get(this.url + 'discord-placeholder/' + id, {headers: headers}).toPromise();
  }

  login(request: any): Observable<any> {
    let params = JSON.stringify(request);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url + "user/login-website", params, {headers: headers});
  }

  loginEpsilon(request: any): Observable<any> {
    let params = JSON.stringify(request);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(GLOBAL.epsilon + "authentication/login", params, {headers: headers});
  }

  getUser(id: string): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    if (!id) return this._http.get(this.url + "user/get-user", {headers: headers}).toPromise();
    return this._http.get(this.url + "user/get-user/" + id, {headers: headers}).toPromise();
  }

  getUserObservable(id?: string): Observable<IUser> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    if (!id) return this._http.get(GLOBAL.epsilon + "users/me", {headers: headers}) as Observable<IUser>;
    return this._http.get(GLOBAL.epsilon + "users/view/" + id, {headers: headers}) as Observable<IUser>;
  }

  getPrefix(id: string): Promise<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getToken());
    if (!id) return this._http.get(this.url + "user/get-placeholder", {headers: headers}).toPromise();
    return this._http.get(this.url + "user/get-placeholder/" + id, {headers: headers}).toPromise();
  }

  mailVerification(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    return this._http.get(GLOBAL.epsilon + "users/update-mail-verification", {headers: headers});
  }

  mailUpdate(update: IMailUpdateVerification): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    return this._http.post(GLOBAL.epsilon + "users/update-mail-verification", update, {headers: headers});
  }

  updateUser(user: IUser, id?: string): Observable<IUser> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    if (!id) return this._http.put(GLOBAL.epsilon + "users/update-profile", user, {headers: headers}) as Observable<IUser>;
    return this._http.put(GLOBAL.epsilon + "users/update/" + id, user,{headers: headers}) as Observable<IUser>;
  }

  passwordUpdate(request: IPasswordUpdate): Observable<boolean> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    return this._http.put(GLOBAL.epsilon +'users/update-password', request, {headers: headers}) as Observable<boolean>;
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

  getEpsilonToken() {
    let token = localStorage.getItem("epsilonToken");
    if(token != "undefined") {
      this.epsilon = token;
    } else {
      this.epsilon = "none";
    }
    if (token === null) this.epsilon = "none";
    return "Bearer " + token;
  }

}
