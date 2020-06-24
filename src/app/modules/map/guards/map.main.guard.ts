import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {MapService} from '../../../services/minecraft/map.service';
import {IMapMain} from "../../../newModels/IMap";
import {forkJoin, Observable, of} from "rxjs";
import {GamemodeService} from "../../../services/minecraft/gamemode.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {IGamemode} from "../../../newModels/IGamemode";

@Injectable()
export class MapMainGuard implements Resolve<IMapMain> {

  constructor (
    private mapService: MapService,
    private gamemodeService: GamemodeService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMapMain> {
    const selectedGamemode: Observable<IGamemode> =
      route.queryParams.gamemode ? this.gamemodeService.get(route.queryParams.gamemode) : of(null);

    return this.gamemodeService.list(-1, 10).pipe(
      mergeMap(gamemodes =>
        forkJoin([
          this.mapService.list(route.queryParams.page || 1, 15),
          selectedGamemode
        ]).pipe(
          map(response => ({
            gamemodes: gamemodes.data.filter(g => g.subTypes.length > 1),
            selected: response[1],
            maps: response[0]
          }) as IMapMain)
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IMapMain);
      })
    );
  }


  public selectGamemode(gamemode: IGamemode): void {

  }

}
