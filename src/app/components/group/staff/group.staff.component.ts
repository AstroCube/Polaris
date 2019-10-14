import {Component, OnInit} from '@angular/core';

import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'group-staff',
  templateUrl: './group.staff.component.html'
})

export class GroupStaffComponent implements OnInit{

  public groups: any[];
  faTwitter = faTwitter;
  faDiscord = faDiscord;
  faEnvelope = faEnvelope;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data => {
      this.groups = data[0];
    }));
  }

}
