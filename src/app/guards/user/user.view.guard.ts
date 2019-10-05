import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MapService} from '../../services/map.service';

@Injectable()
export class UserViewGuard {

  constructor (
    private _userService: UserService,
    private _mapService: MapService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.dataPromise(route).then(data => {
      if (data) {
        return data;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "404"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
  }

  async dataPromise(route: ActivatedRouteSnapshot): Promise<any> {
    let data : any = {};

    data.user = await this._userService.get_profile(route.params.username).then(user => {
      if (user) {
        return user;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "404"}});
        return false;
      }
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
    data.maps = await this._mapService.mapListUser(data.user._id).then((maps) => {
      return maps;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
    return data;
  }

  
}
