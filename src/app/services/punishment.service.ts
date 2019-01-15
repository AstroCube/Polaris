import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { GLOBAL } from "./global";
import {UserService} from './user.service';
import {Punishment} from '../models/punishment';
import {Observable} from 'rxjs';

@Injectable()
export class PunishmentService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  punishment_create(punishment: Punishment): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(this.url + "punishment/create", punishment, {headers: headers});
  }

  punishment_get(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "punishment/get/" + id, {headers: headers}).toPromise();
  }

}
