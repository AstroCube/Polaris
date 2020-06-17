import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../../services/global';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'forum-main',
  templateUrl: './forum.main.component.html'
})

export class ForumMainComponent implements OnInit {

  public categories: any[];

  constructor(
    private _titleService: Title,
    private _metaService: Meta,
    private _route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this._titleService.setTitle("Foros - " + GLOBAL.title);
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Date a conocer, haz amigos y relacionate con la comunidad.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    this._route.data.subscribe((data) => {
      this.categories = data.ForumMainGuard.categories;
      this.categories = this.categories.filter(e => e !== null);
      this.categories = this.categories.map(cat => {
        let fixedCategory = cat;
        fixedCategory.forums = fixedCategory.forums.filter(e => e !== null);
        return cat;
      });
      this.categories = this.categories.filter(e => e.forums && e.forums.length >= 1);
    });
  }

}
