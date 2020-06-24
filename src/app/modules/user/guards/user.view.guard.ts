import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MapService} from '../../../services/minecraft/map.service';
import {FriendService} from '../../../services/minecraft/friend.service';
import {PunishmentService} from '../../../services/moderation/punishment.service';
import {MatchService} from '../../../services/minecraft/match.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import {IUserProfile} from '../../../newModels/user/IUserProfile';

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
            this.mapService.list(-1, 10, {author: user._id}),
            this.punishmentService.punishmentList(-1, 100, {punished: user._id}),
            this.matchService.matchPlayerInfo(user._id),
            this.friendService.listFriends(user._id)
          ]
        ).pipe(
          map((response) => ({
            user: user,
            maps: response[0].data,
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
