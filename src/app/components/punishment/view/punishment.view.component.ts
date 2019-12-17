import {Component, OnInit} from '@angular/core';
import {faList, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'punishment-view',
  templateUrl: './punishment.view.component.html'
})

export class PunishmentViewComponent implements OnInit {

  public punished_placeholder: any;
  public punisher_placeholder: any;
  public punishment_details: any;
  public can_edit: Boolean;
  faUserEdit = faUserEdit;
  faList = faList;

  constructor(
    private _route: ActivatedRoute,
    private _titleService: Title
  ) {
    this.punished_placeholder = {};
    this.punisher_placeholder = {};
    this.can_edit = false;
  }

  ngOnInit() {
    this._titleService.setTitle("Sanciones - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.punished_placeholder = data.PunishmentViewGuard.punished_placeholder;
      this.punisher_placeholder = data.PunishmentViewGuard.punisher_placeholder;
      this.punishment_details = data.PunishmentViewGuard.punishment_details;
      this.can_edit = data.PunishmentViewGuard.can_edit;
    }));
  }
}
