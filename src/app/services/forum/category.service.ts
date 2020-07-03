import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {IPaginateResult} from "../../newModels/IModel";
import {IForumCategory} from "../../newModels/forum/IForumCategory";

@Injectable()
export class CategoryService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  create(category: IForumCategory): Observable<IForumCategory> {
    let params = JSON.stringify(category);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "forum/category", params, {headers: headers}) as Observable<IForumCategory>;
  }

  get(id: string): Observable<IForumCategory> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/category/" + id, {headers: headers}) as Observable<IForumCategory>;
  }

  list(page?: number, size?: number, query?: any): Observable<IPaginateResult<IForumCategory>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.post(GLOBAL.epsilon + "forum/category/list", query,{headers: headers, params}) as Observable<IPaginateResult<IForumCategory>>;
  }

  update(category: IForumCategory): Observable<IForumCategory> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "forum/category", category, {headers: headers}) as Observable<IForumCategory>;
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.delete(GLOBAL.epsilon + "forum/category/" + id, {headers: headers}) as Observable<any>;
  }

}
