import {Component, OnInit} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'appeal-main',
  templateUrl: './appeal.main.component.html'
})

export class AppealMainComponent implements OnInit {

  public can_appeal: boolean = false;
  public gamemode : any = {};
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
