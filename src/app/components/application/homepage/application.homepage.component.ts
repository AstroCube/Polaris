import {Component, OnInit} from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../models/forum/post';
import {Meta, Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-homepage',
  templateUrl: './application.homepage.component.html'
})

export class ApplicationHomepageComponent implements OnInit {

  public posts : Post[];
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private _metaService: Meta,
    private _titleService: Title,
    private _route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Meta
    this._titleService.setTitle("Seocraft Network - ¡Una network para todos!");
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Juega tus minijuegos favoritos en uno de los servidores no premium más prometedoras de Minecraft. ¡Totalmente gratis!'},
      {name: 'robots', content: 'index, follow'}
    ]);

    this._route.data.subscribe((data) => {
      this.posts = data.ApplicationHomepageGuard;
    });
  }
}
