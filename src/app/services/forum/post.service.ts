import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {IPaginateResult} from "../../newModels/IModel";
import {IForumCategory} from "../../newModels/forum/IForumCategory";
import {IPost} from "../../newModels/forum/IPost";

@Injectable()
export class PostService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){}

  create(post: IPost): Observable<IPost> {
    let params = JSON.stringify(post);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "forum/post", params, {headers: headers}) as Observable<IPost>;
  }

  get(id: string): Observable<IPost> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/post/" + id, {headers: headers}) as Observable<IPost>;
  }

  list(page?: number, size?: number, query?: any, sort?: string): Observable<IPaginateResult<IPost>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    const params = new HttpParams().set('page', String(page)).set('size', String(size)).set('sort', sort);
    return this.http.post(GLOBAL.epsilon + "forum/post/list", query,{headers: headers, params}) as Observable<IPaginateResult<IPost>>;
  }

  update(category: IPost): Observable<IPost> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "forum/post", category, {headers: headers}) as Observable<IPost>;
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.delete(GLOBAL.epsilon + "forum/post/" + id, {headers: headers}) as Observable<any>;
  }

}
