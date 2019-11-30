import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {MapService} from '../../services/map.service';
import {FriendService} from '../../services/friend.service';
import {PunishmentService} from '../../services/punishment.service';
import {MatchService} from '../../services/match.service';

@Injectable()
export class UserViewGuard {

  constructor (
    private _userService: UserService,
    private _mapService: MapService,
    private _friendService: FriendService,
    private _punishmentService: PunishmentService,
    private _matchService: MatchService,
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
  }

  async dataPromise(route: ActivatedRouteSnapshot): Promise<any> {
    let data : any = {};
    data.user = await this._userService.get_user(route.params.username).then(user => {
      return user.user;
    });
    data.group = await this._userService.getPrefix(data.user._id).then((group) => {
      return group;
    });
    data.maps = await this._mapService.mapListUser(data.user._id).then((maps) => {
      return maps;
    });
    data.punishments = await this._punishmentService.punishmentUserList(data.user._id).then((punishments) => {
      return punishments;
    });
    data.friends = await this._friendService.listFriends(data.user._id).then((friends) => {
      return friends;
    });
    data.matches = await this._matchService.matchPlayerInfo(data.user._id).then((matches) => {
      return matches;
    });
    return data;
  }

  
}
