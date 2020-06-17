import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MapService} from '../../../services/map.service';

@Injectable()
export class MapViewGuard {

  constructor (
    private _mapService: MapService,
    private _userService: UserService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.dataPromise(route).then(response => {
      if (response) {
        return response;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
  }

  async dataPromise(route: ActivatedRouteSnapshot): Promise<any> {
    let data : any = {};

    data.map = await this._mapService.mapGet(route.params.id).then((map) => {
      return map;
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
    data.user = this._userService.getUser(null).then((user) => {
      return user;
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
    data.placeholder = await this._userService.getPrefix(data.map.author._id).then((placeholder) => {
      return placeholder;
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
    data.canDownload = await this._userService.permission_checker_promise("web_permissions.maps.manage").then((response) => {
      return response.has_permission;
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
