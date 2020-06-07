import {Component, OnInit} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'appeal-main',
  templateUrl: './appeal.main.component.html'
})

export class AppealMainComponent implements OnInit {

  public canAppeal: boolean;
  faList = faList;

  constructor(
    private route: ActivatedRoute
  ) {
    this.canAppeal = true;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data => {
      this.canAppeal = data.AppealMainGuard;
    }));
  }

}
