import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-rules',
  templateUrl: './application.rules.component.html'
})

export class ApplicationRulesComponent {
  constructor(
    private _titleService: Title
  ){}

  ngOnInit() {
    this._titleService.setTitle("Reglas del servidor - " + GLOBAL.title);
  }
}
