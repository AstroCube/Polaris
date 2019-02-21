import {Component, OnInit} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {AppealService} from '../../../services/appeal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'appeal-main',
  templateUrl: './appeal.main.component.html'
})

export class AppealMainComponent implements OnInit {

  public can_appeal: boolean = false;
  faList = faList;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.can_appeal = data.AppealMainGuard.can_appeal;
    }));
  }
}
