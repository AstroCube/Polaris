import {Component, OnInit} from '@angular/core';
import {faComment, faGavel, faList, faMarker, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'report-view',
  templateUrl: './report.view.component.html'
})

export class ReportViewComponent implements OnInit {

  public actions: any[] = [];
  public action_create: any = {};
  public new_action: string;
  public report: any = {};
  public permissions: any = {};
  faComment = faComment;
  faGavel = faGavel;
  faTimes = faTimes;
  faMarker = faMarker;
  faList = faList;

  constructor(
    private _router: Router,
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

  submitAction() {

  }

}
