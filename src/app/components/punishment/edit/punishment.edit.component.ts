import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'punishment-edit',
  templateUrl: './punishment.edit.component.html'
})

export class PunishmentEditComponent implements OnInit{

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      console.log(data.PunishmentEditGuard);
    }));
  }

}
