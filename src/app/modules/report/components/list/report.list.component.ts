import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../../../services/moderation/report.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IReportList, IReportSearch, ReportSearchCriteria} from "../../../../newModels/IReport";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'report-list',
  templateUrl: './report.list.component.html'
})

export class ReportListComponent {

  public data: IReportList;
  public showSpinner: boolean;
  public criteria: ReportSearchCriteria;

  constructor(
    private spinnerService: NgxSpinnerService,
    private titleService: Title,
    private notifierService: NotifierService,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.data = {} as IReportList;
    this.criteria = ReportSearchCriteria.All;
    this.showSpinner = false;
  }

  ngOnInit() {
    this.titleService.setTitle("Tus reportes - " + GLOBAL.title);
    if (this.route.snapshot.queryParams.criteria)
      this.criteria = ReportSearchCriteria[this.route.snapshot.queryParams.criteria] as ReportSearchCriteria;
    this.route.data.subscribe((data => {
      this.data = data.ReportListGuard;
    }));
    if (this.criteria === ReportSearchCriteria.Waiting && (!this.data.permissions.assign || !this.data.permissions.manage)) {
      this.router.navigate(['/error'] , { queryParams: {type: "403"}});
    }
  }

  assignReport(id: string) {
    this.reportService.reportAssign(id).subscribe(
      response => {
        this.notifierService.notify('success', "Has tomado el reporte correctamente.");
        this.router.navigate(['/reportar/' + id]);
      },

      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this.notifierService.notify('error', error.message);
        }
      }
    );
  }

  public refreshCriteria(criteria: string): void {
    this.update(ReportListComponent.searchCriteria(criteria));
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  public update(search: IReportSearch):void {
    this.showSpinner = true;
    this.data.reports.data = [];
    this.reportService.reportList(1, 15, search.query)
      .subscribe(
      (response) => {
        this.criteria = search.criteria;
        setTimeout(() => {
          this.data.reports = response;
          this.showSpinner = false;
        }, 3000);
      },

      (error) => {
        this.router.navigate(['/error'] , { queryParams: {type: "500"}});
      }
    );
  }

  public static searchCriteria(filter: string): IReportSearch {
    let query: {};
    let criteria = ReportSearchCriteria[filter];

    switch (criteria) {
      case ReportSearchCriteria.Closed: {
        query = {closed: true};
        break;
      }
      case ReportSearchCriteria.Open: {
        query = {closed: false};
        break;
      }
      case ReportSearchCriteria.Waiting: {
        query = {assigned: {$exists: false}};
        break;
      }
      default: {
        query = {};
        break;
      }
    }

    return {query, criteria};
  }

}
