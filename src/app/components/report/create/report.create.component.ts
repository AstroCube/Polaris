import {Component, OnInit} from '@angular/core';
import {faComment, faList, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'report-create',
  templateUrl: './report.create.component.html'
})

export class ReportCreateComponent implements OnInit{

  public user_info: any = {};
  faList = faList;
  faPlus = faPlus;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      if (!data.ReportCreateGuard.found) this._router.navigate(['/error'] , { queryParams: {type: "404"}});
      this.user_info = data.ReportCreateGuard.user;
      console.log(this.user_info);
    });
  }
}
