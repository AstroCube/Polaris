import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'application-error',
  templateUrl: './application.error.component.html'
})

export class ApplicationErrorComponent implements OnInit {

  public error: number;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.error = this._activatedRoute.snapshot.queryParams.type;
  }

}
