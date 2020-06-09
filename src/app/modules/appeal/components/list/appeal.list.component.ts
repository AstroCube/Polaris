import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IAppeal, IAppealAction, IAppealCreation, IAppealMain} from "../../../../newModels/IAppeal";
import {faList, faTimes} from '@fortawesome/free-solid-svg-icons';
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {AppealService} from "../../../../services/appeal.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'appeal-list',
  templateUrl: './appeal.list.component.html'
})
export class AppealListComponent implements OnInit {

  public info: IAppealMain;
  public createAction: IAppealCreation;
  faTimes = faTimes;
  faList = faList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appealService: AppealService,
    private notifierService: NotifierService
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.info = data.AppealListGuard;
    });
    this.appealReset();
  }

  public appealReset(): void {
    this.createAction = {punishment: '', comment: '', registeredAddress: this.info.ip} as IAppealCreation;
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  public getAppealLastAction(appeal: IAppeal): IAppealAction {
    return appeal.actions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
  }

  public appealInsert(id):void {
    this.createAction.punishment = id;
  }

  public appealRequest() {
    this.appealService.appealCreate(this.createAction).subscribe(
      response => {
        this.notifierService.notify('success', "La apelación se ha creado correctamente.");
        this.router.navigate(['/apelar/' + response._id]);
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
