import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-error',
  templateUrl: './application.error.component.html'
})

export class ApplicationErrorComponent implements OnInit {

  public error: number;

  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.error = this._activatedRoute.snapshot.queryParams.type;
    this._titleService.setTitle("Error " + this.error + " - " + GLOBAL.title);

  }

}
