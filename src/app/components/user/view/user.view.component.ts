import {Component, OnInit} from '@angular/core';
import {faGavel, faUserPlus, faUserTie, faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';
import {Map} from '../../../models/minecraft/map';
import {GLOBAL} from '../../../services/global';
import {Punishment} from '../../../models/punishment';

@Component({
  selector: 'user-view',
  templateUrl: './user.view.component.html'
})

export class UserViewComponent implements OnInit{

  public user: User;
  public friends: any;
  public maps: Map[];
  public punishments: Punishment[];
  public url: string;
  public groups: Group[];
  faGavel = faGavel;
  faUserPlus = faUserPlus;
  faUserTie = faUserTie;
  faUserTimes = faUserTimes;

  constructor(
    private _route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.data.subscribe((data => {
      this.user = data.UserViewGuard.user;
      this.punishments = data.UserViewGuard.punishments;
      console.log(this.punishments.length);
      this.friends = data.UserViewGuard.friends;
      this.groups = data.UserViewGuard.group.badges;
      this.maps = data.UserViewGuard.maps;
    }));
  }
}
