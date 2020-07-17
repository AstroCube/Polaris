import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {IPaginateResult} from "../../newModels/IModel";
import {ITopic} from "../../newModels/forum/ITopic";

@Injectable()
export class TopicService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  post_like(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/like-status/" + id,  {headers: headers});
  }

  create(topic: ITopic): Observable<ITopic> {
    let params = JSON.stringify(topic);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "forum/topic", params, {headers: headers}) as Observable<ITopic>;
  }

  get(id: string): Observable<ITopic> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/topic/" + id, {headers: headers}) as Observable<ITopic>;
  }

  list(page?: number, size?: number, query?: any, sort?: string): Observable<IPaginateResult<ITopic>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    const params = new HttpParams().set('page', String(page)).set('size', String(size)).set('sort', sort);
    return this.http.post(GLOBAL.epsilon + "forum/topic/list", query,{headers: headers, params}) as Observable<IPaginateResult<ITopic>>;
  }

  update(topic: ITopic): Observable<ITopic> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "forum/topic", topic,{headers: headers}) as Observable<ITopic>;
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.delete(GLOBAL.epsilon + "forum/topic/" + id, {headers: headers}) as Observable<any>;
  }

}
