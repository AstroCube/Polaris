import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../../../services/report.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IReport, IReportAction, ReportActionType} from "../../../../newModels/IReport";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {IReportsPermissions} from "../../../../newModels/permissions/IReportsPermissions";
import {IAppealActionType} from "../../../../newModels/IAppeal";

@Component({
  selector: 'report-view',
  templateUrl: './report.view.component.html'
})

export class ReportViewComponent implements OnInit {

  public report: IReport;
  public user: IUser;
  public initialAction: IReportAction;
  public newAction: IReportAction;
  public permissions: IReportsPermissions;

  constructor(
    private titleService: Title,
    private router: Router,
    private reportService: ReportService,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Ver reporte - " + GLOBAL.title);
    this.route.data.subscribe(data => {
      this.report = data.ReportViewGuard.report;
      this.user = data.ReportViewGuard.user;
      this.permissions = data.ReportViewGuard.permissions;
      this.initialAction = this.report.actions.sort(
        (a, b) => new Date(b.content).getTime() - new Date(a.createdAt).getTime()
      )[0];
      this.actionReset();
    });
  }

  punishUser(): void {
    this.router.navigate(['sanciones/crear'], {queryParams: {report: this.report._id}});
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  createAction(type: string): void {
    this.newAction.type = IAppealActionType[type];
  }

  actionReset(): void {
    this.newAction = {type: ReportActionType.Comment, user: this.user, content: ''} as IReportAction;
  }

  submitAction(): void {
    this.newAction.createdAt = new Date().toISOString();
    this.reportService.reportAction(this.report._id, this.newAction).subscribe(
      response => {
        window.open("/reportar/" + this.report._id, '_self');
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
