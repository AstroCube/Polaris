import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs';
import {IFriendProfile} from '../../newModels/friend/IFriendProfile';

@Injectable()
export class FriendService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ){}

  listFriends(id: string): Observable<IFriendProfile> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.userService.getEpsilonToken());
    return this.http.get(GLOBAL.epsilon + "friend/profile/" + id, {headers: headers}) as Observable<IFriendProfile>;
  }

}
