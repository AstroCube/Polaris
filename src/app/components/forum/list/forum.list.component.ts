import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'forum-list',
  templateUrl: './forum.list.component.html'
})

export class ForumListComponent implements OnInit {

  public tree: any[];
  faPencilAlt = faPencilAlt;
  faPlus = faPlus;
  faTimes = faTimes;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.tree = data.ForumListGuard.forum_list;
    }));
  }

  deleteForum() {

  }
}
