import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../../../../../../services/forum/forum.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IForumView} from "../../../../../../newModels/forum/IForum";
import {IUser, IUserPlaceholder} from "../../../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../../../utilities/group-placeholder";
import {TopicService} from "../../../../../../services/forum/topic.service";

@Component({
  selector: 'forum-view',
  templateUrl: './forum.view.component.html'
})

export class ForumViewComponent implements OnInit {

  public data: IForumView;

  constructor(
    private titleService: Title,
    private forumService: ForumService,
    private topicService: TopicService,
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
    this.topicService.readAll(this.data.forum._id).subscribe(
           response => {
             this.notifierService.notify('success', "Has marcado todos los mensajes como leídos.");
           },
           error => {
             let error_message = <any> error;
             if(error_message != null) {
               this.notifierService.notify('error', "Ha ocurrido un error al limpiar tus mensajes.");
             }
           }
         );
  }

}
