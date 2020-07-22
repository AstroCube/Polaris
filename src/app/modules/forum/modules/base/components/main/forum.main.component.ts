import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../../../../../../services/global';
import {Meta, Title} from '@angular/platform-browser';
import {IForumMain} from "../../../../../../newModels/forum/IForum";
import {IUser, IUserPlaceholder} from "../../../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../../../utilities/group-placeholder";

@Component({
  selector: 'forum-main',
  templateUrl: './forum.main.component.html'
})

export class ForumMainComponent implements OnInit {

  public main: IForumMain[];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute
  ) {
    this.main = [];
  }

  async ngOnInit() {
    this.titleService.setTitle("Foros - " + GLOBAL.title);
    this.metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Date a conocer, haz amigos y relacionate con la comunidad.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    this.route.data.subscribe((data) => {
      this.main = data.ForumMainGuard.filter((holder: IForumMain) => {
        return holder.holder.length > 0;
      });
    });
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

}
