import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {GLOBAL} from './global';
import {Observable} from 'rxjs';
import {IFriendProfile} from '../newModels/friend/IFriendProfile';

@Injectable()
export class FriendService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  listFriends(id: string): Observable<IFriendProfile> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "friend/list-website/" + id, {headers: headers}) as Observable<IFriendProfile>;
  }

}
