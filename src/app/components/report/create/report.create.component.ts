import {Component, OnInit} from '@angular/core';
import {faList, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ReportService} from '../../../services/report.service';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'report-create',
  templateUrl: './report.create.component.html'
})

export class ReportCreateComponent implements OnInit{

  public user_info: any = {};
  public new_report: any = {};
  faList = faList;
  faPlus = faPlus;

  constructor(
    private _titleService: Title,
    private _notifierService: NotifierService,
    private _reportService: ReportService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.data.subscribe(async data => {
      if (!data.ReportCreateGuard.found) this._router.navigate(['/error'] , { queryParams: {type: "404"}});
      this.user_info = data.ReportCreateGuard.user;
      this.new_report.involved = this.user_info.id;
      this.new_report.creator_ip = await this._userService.user_ip().then((ip) => {
        return ip.ip;
      }).catch((err) => {
        switch (err.status) {
          case 404: {
            this._router.navigate(['/error'] , { queryParams: {type: "404"}});
            return false;
          }
          case 403: {
            this._router.navigate(['/error'] , { queryParams: {type: "403"}});
            return false;
          }
          default: {
            this._router.navigate(['/error'] , { queryParams: {type: "500"}});
            return false;
          }
        }
      });
    });

    this._titleService.setTitle("Reportando a " + this.user_info.user_color + " - " + GLOBAL.title);
  }

  createReport() {
    this._reportService.report_create(this.new_report).subscribe(
      response => {
        if (!response.report) {
          this._notifierService.notify('error', "Ha ocurrido un error al crear el reporte.");
        } else {
          this._notifierService.notify('success', "Haz creado una apelación correctamente.");
          this._router.navigate(['/reportar/' +  response.report]);
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
