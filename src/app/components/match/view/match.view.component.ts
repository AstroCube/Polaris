import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../../../models/minecraft/match';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'match-view',
  templateUrl: './match.view.component.html'
})

export class MatchViewComponent {

  public match : Match;
  public url : string;

  constructor(
    private _route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.match = data.MatchViewGuard;
      console.log(data.MatchViewGuard);
    });
  }

}
