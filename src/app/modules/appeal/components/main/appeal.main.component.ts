import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'appeal-main',
  templateUrl: './appeal.main.component.html'
})

export class AppealMainComponent implements OnInit {

  public canAppeal: boolean;

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
