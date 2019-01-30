import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'appeal-list',
  templateUrl: './appeal.list.component.html'
})

export class AppealListComponent {

  public not_appealed: any = {};

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.not_appealed = data.AppealListGuard.not_appealed;
    }));
  }

}
