import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {GLOBAL} from "../../../../services/global";
import {IPaginateResult} from "../../../../newModels/IModel";
import {IPunishment} from "../../../../newModels/IPunishment";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";

@Component({
  selector: 'punishment-list',
  templateUrl: './punishment.list.component.html'
})

export class PunishmentListComponent implements OnInit {

  public result: IPaginateResult<IPunishment>;

  constructor(
    private _route: ActivatedRoute,
    private _titleService: Title,
    private _metaService: Meta
  ) {}

  ngOnInit() {
    this._titleService.setTitle("Sanciones - " + GLOBAL.title);
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Lista pública con las últimas sanciones de Seocraft Network.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    this._route.data.subscribe(data => {
      this.result = data.PunishmentListGuard;
    });
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

}
