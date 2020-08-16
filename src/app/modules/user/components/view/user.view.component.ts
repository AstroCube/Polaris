import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';
import {IUserProfile} from '../../../../newModels/user/IUserProfile';
import {MatchStatus} from '../../../../newModels/match/Status';
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";

@Component({
  selector: 'user-view',
  templateUrl: './user.view.component.html'
})

export class UserViewComponent implements OnInit{

  public MatchStatusEnum = MatchStatus;
  public userProfile: IUserProfile;
  public url: string;

  constructor(
    private _titleService: Title,
    private _route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.data.subscribe((data => {
      console.log(data);
      this.userProfile = data.UserViewGuard;
    }));
    this._titleService.setTitle(this.userProfile.user.username + " - " + GLOBAL.title);
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

}
