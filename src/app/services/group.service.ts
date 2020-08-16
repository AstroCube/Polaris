import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {GLOBAL} from './global';
import {Group} from '../models/group';
import {Observable} from 'rxjs';
import {IGroup, IPermissions, IStaffGroup} from "../newModels/IGroup";
import {IPaginateResult} from "../newModels/IModel";

@Injectable()
export class GroupService {
  public url: String;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  groupStaffList(): Observable<IStaffGroup[]> {
    return this.http.get(GLOBAL.epsilon + "group/actionable/staff") as Observable<IStaffGroup[]>;
  }

  groupList(query?: any, page?: number, size?: number): Observable<IPaginateResult<IGroup>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    let params = new HttpParams().set('page', String(page)).set('perPage', String(size));
    return this.http.post(GLOBAL.epsilon + "group/list", query,{headers, params}) as Observable<IPaginateResult<IGroup>>;
  }

  groupUpdate(group: IGroup): Observable<IGroup> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.put(GLOBAL.epsilon + "group/",  group,{headers: headers}) as Observable<IGroup>;
  }

  permissionsManifest(): Observable<IPermissions> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "group/actionable/manifest",{headers: headers}) as Observable<IPermissions>;
  }

  groupUserAdd(user: string, group: string, comment?: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "group/actionable/add-user", {user, group, comment},{headers: headers});
  }

  groupUserRemove(user: string, group: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.post(GLOBAL.epsilon + "group/actionable/remove-user", {user, group},{headers: headers});
  }

}
