import {Component, OnInit} from '@angular/core';
import {faComment, faGavel, faList, faLock, faTimes, faUserTie} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {AppealService} from '../../../services/appeal.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'appeal-view',
  templateUrl: './appeal.view.component.html'
})

export class AppealViewComponent implements OnInit {

  public actions: any = {};
  public action_create: any = {};
  public appeal: any = {};
  public new_action: string;
  public new_comment: string;
  public permissions: any = {};
  public punishment: any = {};

  faComment = faComment;
  faGavel = faGavel;
  faList = faList;
  faLock = faLock;
  faTimes = faTimes;
  faUserTie = faUserTie;

  constructor(
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appealService: AppealService
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.actions = data.AppealViewGuard.appeal.actions;
      this.action_create = this.actions[0];
      this.appeal = data.AppealViewGuard.appeal.appeal;
      this.permissions = data.AppealViewGuard.permissions;
      this.punishment = data.AppealViewGuard.appeal.punishment;
      console.log(data.AppealViewGuard);
    });
  }

  createAction(action) {
    this.new_action = action;
  }

  submitAction() {
    if (this.new_action == 'comment') {
      this._appealService.appeal_comment(this.appeal._id, this.new_comment).subscribe(
        response => {
          if(!response.updated) {
            this._notifierService.notify('error', "Ha ocurrido un error al comentar la apelación.");
          } else {
            window.open("/apelar/" + this.appeal._id, '_self');
          }
        },

        error => {
          let error_message = <any> error;
          if (error_message != null) {
            this._notifierService.notify('error', error.error.message);
          }
        }
      );
    } else if (this.new_action === 'appeal' || this.new_action === 'un-appeal') {
      this._appealService.appeal_status(this.appeal._id, this.new_comment).subscribe(
        response => {
          if(!response.updated) {
            this._notifierService.notify('error', "Ha ocurrido un error al comentar la apelación.");
          } else {
            window.open("/apelar/" + this.appeal._id, '_self');
          }
        },

        error => {
          let error_message = <any> error;
          if (error_message != null) {
            this._notifierService.notify('error', error.error.message);
          }
        }
      );
    }
  }

  actionReset() {
    this.new_action = "";
    this.new_comment = "";
  }
}
