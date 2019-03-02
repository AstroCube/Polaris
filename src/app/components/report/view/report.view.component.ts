import {Component, OnInit} from '@angular/core';
import {faComment, faGavel, faList, faMarker, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../../services/report.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'report-view',
  templateUrl: './report.view.component.html'
})

export class ReportViewComponent implements OnInit {

  public actions: any[] = [];
  public action_create: any = {};
  public new_action: string;
  public new_comment: string;
  public report: any = {};
  public permissions: any = {};
  faComment = faComment;
  faGavel = faGavel;
  faTimes = faTimes;
  faMarker = faMarker;
  faList = faList;

  constructor(
    private _router: Router,
    private _reportService: ReportService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.actions = data.ReportViewGuard.report.actions;
      this.action_create = this.actions[0];
      this.report = data.ReportViewGuard.report.report;
      this.permissions = data.ReportViewGuard.permissions;
    });
  }

  createAction(action) {
    this.new_action = action;
  }

  actionReset() {
    this.new_action = null;
  }

  submitAction() {
    if (this.new_action == 'comment') {
      this._reportService.report_comment(this.report.id, this.new_comment).subscribe(
        response => {
          if (!response.updated) {
            this._notifierService.notify('error', "Ha ocurrido un error al comentar el reporte.");
          } else {
            this._notifierService.notify('success', "Haz comentado el reporte correctamente.");
            window.open("/reportar/" + this.report.id, '_self');
          }
        },
        error => {
          let error_message = <any> error;
          if (error_message != null) {
            this._notifierService.notify('error', error.error.message);
          }
        }
      );
    } else if (this.new_action == 'close' || this.new_action == 'open') {
      this._reportService.report_close(this.report.id, this.new_comment).subscribe(
        response => {
          if (!response.updated) {
            this._notifierService.notify('error', "Ha ocurrido un error al comentar el reporte.");
          } else {
            this._notifierService.notify('success', "Haz actualizado el reporte correctamente.");
            window.open("/reportar/" + this.report.id, '_self');
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

  punishUser() {
    this._router.navigate(['sancion/crear'], {queryParams: {report: this.report.id}});
  }

}
