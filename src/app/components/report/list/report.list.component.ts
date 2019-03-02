import {Component} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../../services/report.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'report-list',
  templateUrl: './report.list.component.html'
})

export class ReportListComponent {

  public pages: number = 1;
  public page: number = 1;
  public type: string = "all";
  public can_assign: boolean = false;
  public reports: any[];
  faList = faList;

  constructor(
    private _notifierService: NotifierService,
    private _reportService: ReportService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      console.log(data.ReportListGuard);
      this.reports = data.ReportListGuard.list.reports;
      this.can_assign = data.ReportListGuard.can_assign;
      this.page = data.ReportListGuard.list.page;
      this.pages = data.ReportListGuard.list.pages;
      this.type = data.ReportListGuard.list.type;
    }));
    if (this.type === "waiting" && !this.can_assign) this._router.navigate(['/error'] , { queryParams: {type: "403"}});
  }

  assignReport(id: string) {
    this._reportService.report_assign(id).subscribe(
      response => {
        if (response.assigned) {
          this._notifierService.notify('success', "Has tomado el reporte correctamente.");
          this._router.navigate(['/reportar/' + id]);
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al tomar el reporte.");
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
