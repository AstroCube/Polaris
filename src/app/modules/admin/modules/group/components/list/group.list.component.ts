import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../../../../../services/group.service';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../../../services/global';
import {IGroup} from "../../../../../../newModels/IGroup";
import {IUser} from "../../../../../../newModels/user/IUser";
import {IPaginateResult} from "../../../../../../newModels/IModel";
import {UserService} from "../../../../../../services/user.service";

@Component({
  selector: 'group-list',
  templateUrl: './group.list.component.html'
})

export class GroupListComponent implements OnInit {

  @ViewChild("popupClose") public popup: ElementRef;
  public groups: IPaginateResult<IGroup>;
  public selectedGroup: IGroup;
  public user: IUser;
  public comment: string;
  public users: IUser[];
  public type : string;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
    private notifierService: NotifierService,
    private renderer: Renderer2
  ) {
    this.comment = "";
  }

  ngOnInit(): void {
    this.titleService.setTitle("Grupos - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.groups = data.GroupListGuard;
      this.groups.data.sort((a, b) => a.priority - b.priority);
    }));
  }

  editAction(): void {
    this.groupService.groupUpdate(this.selectedGroup).subscribe(
      group => {
        this.notifierService.notify('success', 'Actualizaste correctamente el grupo');
        for (let i  = 0; i < this.groups.data.length; i++)
          if (this.groups.data[i]._id === group._id) this.groups.data[i] = group;
          },

      (error) => {
        this.notifierService.notify('error', error.message);
      }
    );
  }

  addUser(): void {
    this.groupService.groupUserAdd(this.user._id,this.selectedGroup._id, this.comment).subscribe(
      () => {
        this.notifierService.notify('success', 'Agregaste correctamente al usuario');
        this.clearAll();
      },

      (error) => {
        this.notifierService.notify('error', error.message);
      }
    );
  }

  removeUser(): void {
    this.groupService.groupUserRemove(this.user._id, this.selectedGroup._id).subscribe(
      () => {
        this.notifierService.notify('success', 'Eliminaste correctamente al usuario');
        this.clearAll();
      },

      (error) => {
        this.notifierService.notify('error', error.message);
      }
    );
  }

  openAction(group: IGroup, type: string) {
    this.selectedGroup = group;
    this.type = type;
  }

  clearAll() {
    this.selectedGroup = null;
    this.comment = '';
    this.type = '';
    this.clearUser();
    this.renderer.selectRootElement(this.popup.nativeElement).click();
  }

  clearUser() {
    this.user = null;
    this.users = [];
  }

  updateQuery(event: any) {
    if (event.term.length > 2) {
      this.userService.userListAutocompleteObservable(false, event.term).subscribe(
        users => {
          this.users = users;
          if (this.type === 'add')
            this.users = this.users.filter(u => !u.groups.some(g => g.group._id.toString() === this.selectedGroup._id));
          if (this.type === 'remove')
            this.users = this.users.filter(u => u.groups.some(g => g.group._id.toString() === this.selectedGroup._id));
        }
      );
    }
  }


}
