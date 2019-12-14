import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-donation',
  templateUrl: './application.donation.component.html'
})

export class ApplicationDonationComponent implements OnInit {

  constructor(
    private _metaService: Meta,
    private _titleService: Title
  ){}

  ngOnInit() {
    this._titleService.setTitle("Donaciones - " + GLOBAL.title);
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Realiza una donación a Seocraft Network. Con este dinero daremos una mejor experiencia a los usuarios.'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }
}
