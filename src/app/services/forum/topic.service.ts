import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {ITopic, ITopicInteraction, ITopicView} from "../../newModels/forum/ITopic";
import {IPaginateResult} from "../../newModels/IModel";

@Injectable()
export class TopicService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  create(topic: ITopic): Observable<ITopic> {
    let params = JSON.stringify(topic);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "forum/topic", params, {headers: headers}) as Observable<ITopic>;
  }

  view(id: string, page: number, perPage: number): Observable<ITopicView> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    const params = new HttpParams().set('page', String(page)).set('size', String(perPage));
    return this.http.get(GLOBAL.epsilon + "forum/topic/view/" + id, {headers, params}) as Observable<ITopicView>;
  }

  interaction(id: string, quote: string): Observable<ITopicInteraction> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    const params = new HttpParams().set('quote', quote);
    return this.http.get(GLOBAL.epsilon + "forum/topic/interact/" + id, {headers, params}) as Observable<ITopicInteraction>;
  }

  update(topic: ITopic): Observable<ITopic> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "forum/topic", topic,{headers}) as Observable<ITopic>;
  }

  readAll(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "forum/topic/read-all/" + id, {headers}) as Observable<any>;
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.delete(GLOBAL.epsilon + "forum/topic/" + id, {headers}) as Observable<any>;
  }

  newTopics(): Observable<IPaginateResult<ITopic>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.delete(GLOBAL.epsilon + "forum/new-topics", {headers}) as Observable<IPaginateResult<ITopic>>;
  }

}
