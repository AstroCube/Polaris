import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

}
