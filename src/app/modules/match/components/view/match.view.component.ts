import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../../../../models/minecraft/match';
import {GLOBAL} from '../../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'match-view',
  templateUrl: './match.view.component.html'
})

export class MatchViewComponent {

  public match : Match;
  public url : string;

  constructor(
    private _titleService: Title,
    private _route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._titleService.setTitle("Partida en " + this.match.map.name + " - " + GLOBAL.title);
    this._route.data.subscribe((data) => {
      this.match = data.MatchViewGuard;
    });
  }

}
