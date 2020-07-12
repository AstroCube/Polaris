import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../global";
import {UserService} from '../user.service';
import {Topic} from '../../models/forum/topic';
import {Post} from '../../models/forum/post';
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

  post_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/get-post/" + id,  {headers: headers}).toPromise();
  }

  post_like(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/like-status/" + id,  {headers: headers});
  }

  post_update(id: string, post: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.put(this.url + "topic/update/" + id, post, {headers: headers});
  }

  post_delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.delete(this.url + "topic/delete-post/" + id,  {headers: headers});
  }

  topic_create(topic: Topic): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.post(this.url + "topic/create", topic, {headers: headers});
  }

  topic_pin(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/pin/" + id,  {headers: headers});
  }

  topic_reply(post: Post): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.post(this.url + "topic/reply", post,{headers: headers});
  }

  topic_lock(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/lock/" + id,  {headers: headers});
  }

  topic_official(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/official/" + id,  {headers: headers});
  }

  topic_subscribe(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/subscription-status/" + id,  {headers: headers});
  }

  topic_view(id: string, page: number, info: boolean): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/get/" + id + "?page=" + page + "&onlytopic=" + info,  {headers: headers}).toPromise();
  }

  topic_delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.delete(this.url + "topic/delete/" + id, {headers: headers});
  }

  topicHomepage(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/mainTopics/" + id, {headers: headers}).toPromise();
  }

  topicHomepagePosts(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getToken());
    return this.http.get(this.url + "topic/mainPosts/" + id, {headers: headers}).toPromise();
  }

  list(page?: number, size?: number, query?: any, sort?: string): Observable<IPaginateResult<ITopic>> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    const params = new HttpParams().set('page', String(page)).set('size', String(size)).set('sort', sort);
    return this.http.post(GLOBAL.epsilon + "forum/topic/list", query,{headers: headers, params}) as Observable<IPaginateResult<ITopic>>;
  }

}
