import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-terms',
  templateUrl: './application.terms.component.html'
})

export class ApplicationTermsComponent {
  constructor(
    private _titleService: Title
  ){}

  ngOnInit() {
    this._titleService.setTitle("Términos y condiciones - " + GLOBAL.title);
  }
}
