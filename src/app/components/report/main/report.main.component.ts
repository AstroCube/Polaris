import {Component, OnInit} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'report-main',
  templateUrl: './report.main.component.html'
})

export class ReportMainComponent implements OnInit {

  public users: any = {};
  public reported_user: string;
  faList = faList;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data.ReportMainGuard.fixed_users;
    });
  }

  beginReport() {
    this._router.navigate(['/reportar/nuevo'], {queryParams: {user: this.reported_user.username}});
  }
}
