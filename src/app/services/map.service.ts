import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {GLOBAL} from './global';
import {Observable} from 'rxjs';

@Injectable()
export class MapService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ){
    this.url = GLOBAL.url;
  }

  mapGet(id: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "map/get-website/" + id, {headers: headers}).toPromise();
  }

  mapDownloadFile(file: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "map/get-file/" + file, {headers: headers, responseType: 'blob'});
  }

  mapDownloadJSON(file: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "map/get-config/" + file, {headers: headers, responseType: 'blob'});
  }

  mapGetQuery(page: number, gamemode: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    let query = "";
    if (gamemode) {
      query = new HttpParams()
        .set("gamemode", gamemode)
        .toString();
    }
    return this._http.get(this.url + "map/get-query/" + page + query, {headers: headers}).toPromise();
  }

  mapGamemodeList(): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "gamemode/list", {headers: headers}).toPromise();
  }

  mapGamemodeUser(user: string): Promise<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(this.url + "map/get-user/" + user, {headers: headers}).toPromise();
  }

}
