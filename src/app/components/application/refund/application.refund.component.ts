import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-refund',
  templateUrl: './application.refund.component.html'
})

export class ApplicationRefundComponent {

  constructor(
    private _titleService: Title
  ){}

  ngOnInit() {
    this._titleService.setTitle("Política de reembolsos - " + GLOBAL.title);
  }

}
