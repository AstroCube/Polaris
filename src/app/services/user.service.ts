import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {IMailUpdateVerification, IPasswordUpdate, IUser} from '../newModels/user/IUser';

@Injectable()
export class UserService {
  public url: String;
  public epsilon;

  constructor(
    private _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  login(request: any): Observable<any> {
    let params = JSON.stringify(request);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(GLOBAL.epsilon + "authentication/login", params, {headers: headers});
  }

  getUser(id?: string): Observable<IUser> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    if (!id) return this._http.get(GLOBAL.epsilon + "user/profile/me", {headers: headers}) as Observable<IUser>;
    return this._http.get(GLOBAL.epsilon + "user/" + id, {headers: headers}) as Observable<IUser>;
  }

  mailVerification(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    return this._http.get(GLOBAL.epsilon + "user/update-mail-verification", {headers: headers});
  }

  mailUpdate(update: IMailUpdateVerification): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    return this._http.post(GLOBAL.epsilon + "user/update-mail-verification", update, {headers: headers});
  }

  updateUser(user: IUser): Observable<IUser> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
   return this._http.put(GLOBAL.epsilon + "user", user,{headers: headers}) as Observable<IUser>;
  }

  passwordUpdate(request: IPasswordUpdate): Observable<boolean> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    return this._http.put(GLOBAL.epsilon +'user/update-password', request, {headers: headers}) as Observable<boolean>;
  }

  userListAutocompleteObservable(own?: boolean, search?: string): Observable<IUser[]> {
    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", this.getEpsilonToken());
    let route = "";
    let searchQuery = "";
    if (own) route = "/true";
    if (search) searchQuery = "?search=" + search;
    return this._http.get(GLOBAL.epsilon + "user/actions/list-all" + route + searchQuery, {headers: headers}) as Observable<IUser[]>;
  }

  userIp(): Observable<any> {
    return this._http.get("https://api.ipify.org?format=json") as Observable<any>;
  }

  getToken() {
    let token = localStorage.getItem("token");
    if (!token) return '';
    return token;
  }

  getEpsilonToken() {
    let token = localStorage.getItem("epsilonToken");
    if (!token) return '';
    return "Bearer " + token;
  }

}
