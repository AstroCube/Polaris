import {Component, OnInit} from '@angular/core';
import {faBookmark, faEllipsisV, faListUl, faLock, faPlus, faThumbtack} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {ForumService} from '../../../services/forum.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'forum-view',
  templateUrl: './forum.view.component.html'
})

export class ForumViewComponent implements OnInit{

  public forum_data: any;
  public forum_info: any;
  faBookmark = faBookmark;
  faEllipsisV = faEllipsisV;
  faListUl = faListUl;
  faLock = faLock;
  faPlus = faPlus;
  faThumbtack = faThumbtack;

  constructor(
    private _titleService: Title,
    private _forumService: ForumService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.forum_data = data.ForumViewGuard.forum_data;
      this.forum_info = data.ForumViewGuard.forum_info;
    }));
    if (this.forum_data.permissions.view === "own") {
      if (this.forum_info.pinned_topics && this.forum_info.pinned_topics.length >= 1) {
        let pinned_own: any = this.forum_info.pinned_topics;
        pinned_own = pinned_own.filter((topic) => { return topic.writer.id.toString() === this.forum_info.info.observer.toString(); });
        this.forum_info.pinned_topics = pinned_own;
      }
      if (this.forum_info.topics && this.forum_info.topics.length >= 1) {
        let topics_own: any = this.forum_info.topics;
        topics_own = topics_own.filter((topic) => { return topic.writer.id.toString() === this.forum_info.info.observer.toString(); });
        this.forum_info.topics = topics_own;
      }
    }
    this._titleService.setTitle(this.forum_data.breadcrumb.actual.name + " - " + GLOBAL.title);
  }

  newTopic() {
    this._router.navigate(['/foro/tema/crear'], {queryParams: {forum: this.forum_info.info.id}});
  }

  readAll() {
    this._forumService.forum_clear(this.forum_info.info.id).subscribe(
      response => {
        if (response.cleared) {
          this._notifierService.notify('success', "Has marcado todos los mensajes como leídos.");
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al limpiar tus mensajes.");
        }

      },
      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al limpiar tus mensajes.");
        }
      }
    );
  }

}
