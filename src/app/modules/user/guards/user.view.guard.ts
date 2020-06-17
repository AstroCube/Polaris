import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MapService} from '../../../services/map.service';
import {FriendService} from '../../../services/friend.service';
import {PunishmentService} from '../../../services/punishment.service';
import {MatchService} from '../../../services/match.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserProfile} from '../../../newModels/user/IUserProfile';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class UserViewGuard implements Resolve<IUserProfile> {

  constructor (
    private userService: UserService,
    private mapService: MapService,
    private friendService: FriendService,
    private punishmentService: PunishmentService,
    private matchService: MatchService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserProfile> {
    return this.userService.getUserObservable(route.params.username).pipe(
      mergeMap((user) =>
        forkJoin(
          [
            this.mapService.mapListUser(user._id),
            this.punishmentService.punishmentList(-1, 100, {punished: user._id}),
            this.matchService.matchPlayerInfo(user._id),
            this.friendService.listFriends(user._id)
          ]
        ).pipe(
          map((response) => ({
            user: user,
            maps: response[0],
            punishments: response[1].data,
            lastMatches: response[2],
            friends: response[3],
          } as IUserProfile))
        )
      ),
      catchError((error) => {
        this.router.navigate(['/error'] , { queryParams: {type: error.status, message: error.error}});
        return of({} as IUserProfile);
      })
    );
  }

}
