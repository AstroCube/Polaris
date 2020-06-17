import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';

@Component({
  selector: 'application-error',
  templateUrl: './application.error.component.html'
})

export class ApplicationErrorComponent implements OnInit {

  public error: number;
  public message: string;

  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let m = this._activatedRoute.snapshot.queryParams.message;
    this.error = this._activatedRoute.snapshot.queryParams.type;
    this.message = m ? m : 'Unknown error';
    this._titleService.setTitle("Error " + this.error + " - " + GLOBAL.title);
  }

}
