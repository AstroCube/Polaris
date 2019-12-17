import {Component, OnInit} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'report-main',
  templateUrl: './report.main.component.html'
})

export class ReportMainComponent implements OnInit {

  public users: any = {};
  public reported_user: any = null;
  faList = faList;

  constructor(
    private _titleService: Title,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._titleService.setTitle("Reportes - " + GLOBAL.title);
    this._route.data.subscribe(data => {
      this.users = data.ReportMainGuard;
    });
  }

  beginReport() {
    this._router.navigate(['/reportar/nuevo'], {queryParams: {user: this.reported_user.username}});
  }
}
