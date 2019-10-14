import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faUserPlus, faUserMinus, faList, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Group} from '../../../models/group';
import {GroupService} from '../../../services/group.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'group-list',
  templateUrl: './group.list.component.html'
})

export class GroupListComponent implements OnInit {

  public groups : Group[];
  public selectedGroup : Group;
  public updatableUser : string;
  public users: any;
  public type : string;
  faList = faList;
  faTimes = faTimes;
  faPencilAlt = faPencilAlt;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _notifierService: NotifierService
  ) {
    this.selectedGroup = new Group("","",0,"","","","",[],[],false,[]);
  }

  ngOnInit(): void {
    this._route.data.subscribe((data => {
      this.groups = data.GroupListGuard.group;
      this.users = data.GroupListGuard.users;
    }));
  }

  editAction(): void {
    this._groupService.groupUpdate(this.selectedGroup).subscribe(
        (response) => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar la apelación.");
        } else {
          window.open("/admin/grupos", '_self');
        }
      },

      (error) => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  editGroup(id: Group, type: string) {
    this.selectedGroup = id;
    this.type = type;
  }

}
