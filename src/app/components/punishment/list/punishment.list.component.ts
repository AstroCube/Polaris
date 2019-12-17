import {Component, OnInit} from '@angular/core';
import {faStar, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'punishment-list',
  templateUrl: './punishment.list.component.html'
})

export class PunishmentListComponent implements OnInit {
  public pages: number;
  public page: number;
  public punishments: any;
  faStar = faStar;
  faTimes = faTimes;

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
    this._route.data.subscribe((data => {
      this.punishments = data.PunishmentListGuard.paginatedPunishments;
      this.pages = data.PunishmentListGuard.pages;
      this.page = data.PunishmentListGuard.page;
    }));
  }
}
