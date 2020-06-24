import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs';
import {Match} from '../../models/minecraft/match';
import {IMatchProfile} from '../../newModels/match/IMatchProfile';

@Injectable()
export class MatchService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  matchGet(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "match/get-website/" + id, {headers: headers}).toPromise();
  }

  matchPlayerInfo(id: string): Observable<IMatchProfile> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "match/get-user/" + id, {headers: headers}) as Observable<IMatchProfile>;
  }

}
