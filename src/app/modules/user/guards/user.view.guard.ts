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
import {IMatch} from "../../../newModels/match/IMatch";
import {IMatchProfile} from "../../../newModels/match/IMatchProfile";
import {IUser} from "../../../newModels/user/IUser";

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
    return this.userService.getUser(route.params.username).pipe(
      mergeMap((user) =>
        forkJoin(
          [
            this.mapService.list(-1, 10, {author: user._id}),
            this.punishmentService.punishmentList(-1, 100, {punished: user._id}),
            this.getProfileMatches(user),
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

  private getProfileMatches(user: IUser): Observable<IMatchProfile> {
    return this.matchService.list({"teams.members.user": user._id}, -1).pipe(
      map(matches => {

        let wonMatches = 0;
        matches.data.forEach((match) => {
          match.winner.forEach((winner) => {
            if (winner.toString() === user._id.toString()) wonMatches++;
          });
        });

        return {
          wonMatches: wonMatches,
          playedMatches: matches.data.length,
          lastMatches: matches.data.slice(0, 10)
        } as IMatchProfile;

      })
    );
  }

}
