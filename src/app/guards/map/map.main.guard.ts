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
    if (route.params.page) page = route.params.page;
    return this._mapService.mapGetQuery(page, gamemode).then(response => {
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
}
