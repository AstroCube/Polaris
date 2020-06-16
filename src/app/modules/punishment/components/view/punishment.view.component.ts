import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from "../../../../services/global";
import {IPunishment} from "../../../../newModels/IPunishment";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {IPermissions} from "../../../../newModels/IGroup";

@Component({
  selector: 'punishment-view',
  templateUrl: './punishment.view.component.html'
})

export class PunishmentViewComponent implements OnInit {

  public punishment: IPunishment;
  public permissions: IPermissions;

  constructor(
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {}

  ngOnInit() {
    this._titleService.setTitle("Sanciones - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.punishment = data.PunishmentViewGuard;
      this.permissions = data.UserPermissionsGuard;
    }));
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

}
