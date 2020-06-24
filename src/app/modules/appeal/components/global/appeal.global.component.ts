import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppealService} from '../../../../services/moderation/appeal.service';
import {Meta, Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';
import {IPaginateResult} from "../../../../newModels/IModel";
import {IAppeal, IAppealAction, IAppealActionType, IAppealSearch} from "../../../../newModels/IAppeal";
import {IAppealSearchCriteria, IAppealsPermissions} from "../../../../newModels/permissions/IAppealsPermissions";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {NotifierService} from "angular-notifier";
import {IGamemode} from "../../../../newModels/IGamemode";

@Component({
  selector: 'appeal-global',
  templateUrl: './appeal.global.component.html'
})

export class AppealGlobalComponent implements OnInit {

  public appeals: IPaginateResult<IAppeal>;
  public showSpinner: boolean;
  public criteria: IAppealSearchCriteria;
  public permissions: IAppealsPermissions;
  public user: IUser;

  constructor(
    private appealService: AppealService,
    private metaService: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.criteria = IAppealSearchCriteria.All;
    this.showSpinner = false;
  }

  ngOnInit() {
    this.titleService.setTitle("Apelaciones - " + GLOBAL.title);
    this.metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: '¿Te han sancionado?, No te preocupes, si crees que fué injusto puedes apelar en esta página.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    if (this.route.snapshot.queryParams.criteria) this.criteria = IAppealSearchCriteria[this.route.snapshot.queryParams.criteria] as IAppealSearchCriteria;
    this.route.data.subscribe(data => {
      this.appeals = data.AppealGlobalGuard.appeals;
      this.permissions = data.AppealGlobalGuard.permissions;
      this.user = data.AppealGlobalGuard.user;
    });
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  public lastAction(actions: IAppealAction[]): IAppealAction {
    return actions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }

  public getSupervised(appeal: IAppeal): IUser {
    return appeal.supervisor ? appeal.supervisor : appeal.punishment.issuer;
  }

  public assignAppeal(appeal: IAppeal): void {
    this.appealService.appealAction(appeal._id, {createdAt: new Date(), user: this.user, type: IAppealActionType.Supervised, content: ''})
      .subscribe(
        appeal => {
          this.router.navigate(['/apelar/' + appeal._id]);
        },

        error => {
          let error_message = <any> error;
          if (error_message != null) {
            this.notifierService.notify('error', error.error.message);
          }
        }
      );
  }

  public refreshCriteria(criteria: string): void {
    this.update(AppealGlobalComponent.searchCriteria(criteria));
  }

  public update(search: IAppealSearch):void {
    this.showSpinner = true;
    this.appeals.data = [];
    this.appealService.appealList(1, 15, search.query, search.own).subscribe(
      (response) => {
        this.criteria = search.criteria;
        setTimeout(() => {
          this.appeals = response;
          this.showSpinner = false;
        }, 3000);
      },

      (error) => {
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
      }
    );
  }

  public static searchCriteria(filter: string): IAppealSearch {
    let query = {};
    let own = false;
    let criteria = IAppealSearchCriteria[filter];

    switch (criteria) {
      case IAppealSearchCriteria.Closed: {
        query = {closed: true};
        break;
      }
      case IAppealSearchCriteria.Open: {
        query = {closed: false};
        break;
      }
      case IAppealSearchCriteria.Escalated: {
        query = {escalated: true};
        own = true;
        break;
      }
      case IAppealSearchCriteria.Involved: {
        own = true;
        break;
      }
      case IAppealSearchCriteria.Waiting: {
        query = {escalated: true, supervisor: {$exists: false}};
        own = true;
        break;
      }
      default: {
        query = {};
        break;
      }
    }

    return {query, own, criteria};
  }

}
