import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';

@Component({
  selector: 'application-privacy',
  templateUrl: './application.privacy.component.html'
})

export class ApplicationPrivacyComponent {

  constructor(
    private _titleService: Title
  ){}

  ngOnInit() {
    this._titleService.setTitle("Política de Privacidad - " + GLOBAL.title);
  }

}
