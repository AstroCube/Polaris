import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../../../../../../services/forum/forum.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IForumView} from "../../../../../../newModels/forum/IForum";
import {IUser, IUserPlaceholder} from "../../../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../../../utilities/group-placeholder";

@Component({
  selector: 'forum-view',
  templateUrl: './forum.view.component.html'
})

export class ForumViewComponent implements OnInit {

  public data: IForumView;

  constructor(
    private titleService: Title,
    private forumService: ForumService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data => this.data = data.ForumViewGuard));
    this.titleService.setTitle(this.data.forum.name + " - " + GLOBAL.title);
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  newTopic() {
    this.router.navigate(['foro/tema/crear'], {queryParams: {forum: this.data.forum._id}})
  }

  readAll() {
    //this._forumService.forum_clear(this.forum_info.info.id).subscribe(
    //       response => {
    //         if (response.cleared) {
    //           this._notifierService.notify('success', "Has marcado todos los mensajes como leídos.");
    //         } else {
    //           this._notifierService.notify('error', "Ha ocurrido un error al limpiar tus mensajes.");
    //         }
    //
    //       },
    //       error => {
    //         let error_message = <any> error;
    //         if(error_message != null) {
    //           this._notifierService.notify('error', "Ha ocurrido un error al limpiar tus mensajes.");
    //         }
    //       }
    //     );
  }

}
