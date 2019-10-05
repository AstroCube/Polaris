import {Component, OnInit} from '@angular/core';
import {faGavel, faUserPlus, faUserTie, faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';
import {Map} from '../../../models/minecraft/map';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'user-view',
  templateUrl: './user.view.component.html'
})

export class UserViewComponent implements OnInit{

  public groups: Group[];
  public logged_details: any;
  public punishments: any[];
  public user: User;
  public maps: Map[];
  public url: string;
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
      this.maps = data.UserViewGuard.maps;
      this.logged_details = data.UserViewGuard.user.logged_details;
      this.punishments = data.UserViewGuard.user.punishments;
      this.groups = data.UserViewGuard.user.groups;
    }));
  }
}
