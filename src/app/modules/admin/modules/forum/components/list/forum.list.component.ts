import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {ICategoryTree} from "../../../../../../newModels/forum/IForumCategory";

@Component({
  selector: 'forum-list',
  templateUrl: './forum.list.component.html'
})

export class ForumListComponent implements OnInit {

  public tree: ICategoryTree[];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Foros - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.tree = data.ForumListGuard;
    }));
  }

  deleteForum() {

  }

}
