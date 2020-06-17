import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'forum-list',
  templateUrl: './forum.list.component.html'
})

export class ForumListComponent implements OnInit {

  public tree: any[];

  constructor(
    private _titleService: Title,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._titleService.setTitle("Foros - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.tree = data.ForumListGuard.forum_list;
    }));
  }

  deleteForum() {

  }
}
