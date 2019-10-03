import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {MapService} from '../../services/map.service';

@Injectable()
export class MapMainGuard {

  constructor (
    private _mapService: MapService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let gamemode = null;
    let page = 1;
    if (route.queryParams.gamemode) gamemode = route.queryParams.gamemode;
    if (route.queryParams.page) page = route.queryParams.page;
    return this.dataPromise(page, gamemode).then(response => {
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

  async dataPromise(page, gamemode): Promise<any> {
    let data : any = {};

    data.map = await this._mapService.mapGetQuery(page, gamemode).then((maps) => {
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
    data.gamemode = await this._mapService.mapGamemodeList().then((gamemode) => {
      return gamemode;
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
