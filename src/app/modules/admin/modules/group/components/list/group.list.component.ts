import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Group} from '../../../../../../models/group';
import {GroupService} from '../../../../../../services/group.service';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';

@Component({
  selector: 'group-list',
  templateUrl: './group.list.component.html'
})

export class GroupListComponent implements OnInit {

  public groups : Group[];
  public selectedGroup : Group;
  public updatableUser : any;
  public updatableComment: string;
  public users: any;
  public type : string;

  constructor(
    private _titleService: Title,
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _notifierService: NotifierService
  ) {
    this.selectedGroup = new Group("","",0,"","","","",[],[],false,[]);
    this.updatableComment = "";
  }

  ngOnInit(): void {
    this._titleService.setTitle("Grupos - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.groups = data.GroupListGuard.group;
      this.users = data.GroupListGuard.users;
    }));
  }

  editAction(): void {
    this._groupService.groupUpdate(this.selectedGroup).subscribe(
        () => {
          window.open("/admin/grupos", '_self');
      },

      (error) => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  addUser(): void {
    if (this.updatableComment === "") this.updatableComment = this.selectedGroup.name.toLowerCase();
    this._groupService.groupUserAdd(this.updatableUser._id, this.selectedGroup._id, this.updatableComment).subscribe(
      () => {
        window.open("/admin/grupos", '_self');
      },

      (error) => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  removeUser(): void {
    this._groupService.groupUserRemove(this.updatableUser._id, this.selectedGroup._id).subscribe(
      () => {
        window.open("/admin/grupos", '_self');
      },

      (error) => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  openAction(id: Group, type: string) {
    this.selectedGroup = id;
    this.type = type;
  }

}
