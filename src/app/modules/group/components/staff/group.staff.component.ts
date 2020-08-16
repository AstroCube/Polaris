import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IStaffList} from '../../../../models/group/IStaffList';
import {GroupService} from '../../../../services/group.service';
import {IStaffGroup} from "../../../../newModels/IGroup";
import {IUser, IUserGroup, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";

@Component({
  selector: 'group-staff',
  templateUrl: './group.staff.component.html'
})

export class GroupStaffComponent implements OnInit {

  public groups: IStaffGroup[];

  constructor(
    private titleService: Title,
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Grupos - " + GLOBAL.title);
    this.route.data.subscribe(data => {
      this.groups = data.GroupStaffGuard;
      this.groups.sort((a, b) => a.group.priority - b.group.priority);
    });
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  public getSelectedGroup(id: string, user: IUser): IUserGroup {
    return user.groups.filter(g => g.group._id === id)[0];
  }

}
