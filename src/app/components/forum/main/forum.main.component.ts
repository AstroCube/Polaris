import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'forum-main',
  templateUrl: './forum.main.component.html'
})

export class ForumMainComponent implements OnInit {

  public categories: any;
  faEllipsisV = faEllipsisV;

  constructor(
    private _route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this._route.data.subscribe((data => {
      this.categories = data.ForumMainGuard.categories;
    }));
  }

}
