import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IAppealAction, IAppealActionType, IAppealResolve} from "../../../../newModels/IAppeal";
import {Title} from "@angular/platform-browser";
import {GLOBAL} from "../../../../services/global";
import {IAppealPermissible} from "../../../../newModels/permissions/IAppealsPermissions";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {AppealService} from "../../../../services/moderation/appeal.service";
import {NotifierService} from "angular-notifier";
import * as dotty from 'dotty';

@Component({
  selector: 'appeal-view',
  templateUrl: './appeal.view.component.html'
})

export class AppealViewComponent implements OnInit {

  public info: IAppealResolve;
  public createdAction: IAppealAction;
  public initialAction: IAppealAction;

  constructor(
    private route: ActivatedRoute,
    private appealService: AppealService,
    private notifierService:  NotifierService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Apelaciones - " + GLOBAL.title);
    this.route.data.subscribe(data => {
      this.info = data.AppealViewGuard;
      this.initialAction = this.info.appeal.actions.filter(action => action.type === IAppealActionType.Create)[0];
      this.appealReset();
    });
  }

  public appealReset(): void {
    this.createdAction = {user: this.info.user, content: '', type: IAppealActionType.Comment} as IAppealAction;
  }

  permissionsChecker(permission: string, moderation: boolean): boolean {
    return (
      (this.info.permissions.manage || dotty.get(this.info.permissions, permission) === IAppealPermissible.All) ||
      (
        moderation &&
        (
          dotty.get(this.info.permissions, permission) === IAppealPermissible.Involved &&
          (
            this.info.appeal.punishment.issuer._id === this.info.user._id ||
            (this.info.appeal.supervisor && this.info.appeal.supervisor._id === this.info.user._id)
          )
        )
      ) ||
      (
        (
          (
            dotty.get(this.info.permissions, permission) === IAppealPermissible.Involved ||
            dotty.get(this.info.permissions, permission) === IAppealPermissible.Own
          ) &&
          (
            this.info.appeal.punishment.issuer._id === this.info.user._id ||
            this.info.appeal.punishment.punished._id === this.info.user._id ||
            (this.info.appeal.supervisor && this.info.appeal.supervisor._id === this.info.user._id)
          )
        )
      )
    );
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  createAction(type: string): void {
    this.createdAction.type = IAppealActionType[type];
  }

  lockAppeal(): void {
    this.createdAction.type = IAppealActionType.Lock;
    if (this.info.appeal.locked) this.createdAction.type = IAppealActionType.Unlock;
    this.submitAction();
  }

  submitAction(): void {
    this.createdAction.createdAt = new Date();
    this.appealService.appealAction(this.info.appeal._id, this.createdAction).subscribe(
      response => {
        window.open("/apelar/" + this.info.appeal._id, '_self');
      },

      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }

}
