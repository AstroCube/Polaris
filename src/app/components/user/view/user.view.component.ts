import {Component, OnInit} from '@angular/core';
import {faGavel, faUserPlus, faUserTie, faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {Group} from '../../../models/group';

@Component({
  selector: 'user-view',
  templateUrl: './user.view.component.html'
})

export class UserViewComponent implements OnInit{

  public groups: Group[];
  public logged_details: any;
  public punishments: any[];
  public user: User;
  faGavel = faGavel;
  faUserPlus = faUserPlus;
  faUserTie = faUserTie;
  faUserTimes = faUserTimes;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data => {
      this.user = data.UserViewGuard.user;
    }));
  }
}
