import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {MapService} from '../../../services/minecraft/map.service';
import {IMapView} from "../../../newModels/IMap";
import {forkJoin, Observable, of} from "rxjs";
import {IUserPermissionsPair} from "../../../newModels/user/IUser";
import {UserService} from "../../../services/user.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {GroupService} from "../../../services/group.service";

@Injectable()
export class MapViewGuard implements Resolve<IMapView> {

  constructor (
    private mapService: MapService,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMapView> {
    return this.mapService.get(route.params.id).pipe(
      mergeMap(gameMap =>
        forkJoin([this.userRequest()]).pipe(
          map(response => {
            return ({
              map: gameMap,
              permissions: response[0]
            }) as IMapView;

          })
        )
      ),
      catchError(error => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IMapView);
      })
    );
  }

  userRequest(): Observable<IUserPermissionsPair> {
    return this.userService.getEpsilonToken() !== '' ?
        this.userService.getUser().pipe(
          mergeMap(user =>
            forkJoin([this.groupService.permissionsManifest()]).pipe(
              map(response => ({
                user,
                permissions: response[0]
              }))
            )
          )
        ) : of(null);
  }


}
