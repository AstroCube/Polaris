import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {UserService} from './user.service';
import {Category} from '../models/forum/category';

@Injectable()
export class CategoryService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  category_create(category: Category): Observable<any> {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "category/create", params, {headers: headers});
  }

  category_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "category/get/" + id, {headers: headers}).toPromise();
  }

  category_list(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "category/list", {headers: headers}).toPromise();
  }

  category_update(id: string, category: Category): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put(this.url + "category/update/" + id, category, {headers: headers});
  }

  category_delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.delete(this.url + "category/delete/" + id, {headers: headers});
  }

}
