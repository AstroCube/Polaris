import {Component, OnInit} from '@angular/core';
import {faStar, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

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
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.punishments = data.PunishmentListGuard.paginatedPunishments;
      this.pages = data.PunishmentListGuard.pages;
      this.page = data.PunishmentListGuard.page;
    }));
  }
}
