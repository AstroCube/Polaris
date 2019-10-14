import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {GLOBAL} from './global';
import {Group} from '../models/group';
import {Observable} from 'rxjs';

@Injectable()
export class GroupService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  groupStaffList(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "group/staff", {headers: headers}).toPromise();
  }

  groupList(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "group/list", {headers: headers}).toPromise();
  }

  groupUpdate(group: Group): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    let params = JSON.stringify(group);
    return this._http.put(this.url + "group/update/" + group._id,  params,{headers: headers});
  }

  groupGetStaffMembers(id : string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "group/staff-members/" + id, {headers: headers}).toPromise();
  }

  groupUserAdd(id: string, group: string, comment: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    let params = JSON.stringify({group: group, comment: comment});
    return this._http.post(this.url + "group/add/" + id,  params,{headers: headers});
  }

  groupUserRemove(id: string, group: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    let params = JSON.stringify({group: group});
    return this._http.post(this.url + "group/remove/" + id,  params,{headers: headers});
  }

}
