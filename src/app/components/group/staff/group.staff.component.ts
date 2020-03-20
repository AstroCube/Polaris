import {Component, OnInit} from '@angular/core';

import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../services/global';
import {Title} from '@angular/platform-browser';
import {IStaffList} from '../../../models/group/IStaffList';
import {GroupService} from '../../../services/group.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'group-staff',
  templateUrl: './group.staff.component.html'
})

export class GroupStaffComponent implements OnInit {

  public groups: IStaffList[];
  faTwitter = faTwitter;
  faDiscord = faDiscord;
  faEnvelope = faEnvelope;

  constructor(
    private _titleService: Title,
    private _groupService: GroupService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._titleService.setTitle("Grupos - " + GLOBAL.title);
    this._route.data.subscribe(data => {
      this.groups = data.GroupStaffGuard;
      this.groups.sort((a, b) => {
        return a.details.priority - b.details.priority;
      });
    });
  }

}
