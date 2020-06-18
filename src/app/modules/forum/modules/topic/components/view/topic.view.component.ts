import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../../../../services/topic.service';
import {NotifierService} from 'angular-notifier';
import * as moment from 'moment';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'topic-view',
  templateUrl: './topic.view.component.html'
})

export class TopicViewComponent implements OnInit {

  public forum_data: any;
  public can_reply: boolean;
  public can_edit: boolean;
  public can_delete: boolean;
  public posts: any;
  public guest: boolean;
  public topic_data: any;
  public topic_id: string;

  constructor(
    private _titleService: Title,
    private _topicService: TopicService,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.forum_data = {};
    this.topic_data = {};
    this.can_reply = false;
    this.can_delete = false;
    this.guest = false;
  }

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.forum_data = data.TopicViewGuard.forum_data;
      this.posts = data.TopicViewGuard.topic_data.posts;
      this.topic_data = data.TopicViewGuard.topic_data;
    }));
    if (!this.topic_data.topic_info.locked) {
      if (this.forum_data.permissions.comment === "all") this.can_reply = true;
      if (this.forum_data.permissions.comment === "own" && this.topic_data.topic_info.own) this.can_reply = true;
    }
    this.topic_id = this._route.snapshot.params.id;
    let time = parseInt(this.topic_data.topic_info.created_at, 10)*1000;
    if (this.forum_data.permissions.delete === "all") this.can_delete = true;
    if (this.forum_data.permissions.delete === "own" && this.topic_data.topic_info.own && moment(time).add('1', 'hours').unix() > moment().unix()) this.can_delete = true;
    if (this.forum_data.permissions.edit === "all") this.can_edit = true;
    if (this.forum_data.permissions.edit === "own" && this.topic_data.topic_info.own && moment(time).add('1', 'hours').unix() > moment().unix()) this.can_edit = true;
    this._titleService.setTitle(this.topic_data.topic_info.subject + " - " + GLOBAL.title);

    if (this.forum_data.permissions.guest) {
      this.can_reply = false;
      this.can_edit = false;
      this.can_delete = false;
      this.guest = true;
    }

  }

  quoteLink(id) {
    this._router.navigate(['/foro/tema/responder/' + this.topic_id], {queryParams: {quote: id}});
  }

  deleteValid(id, created_at): boolean {
    if (this.forum_data.permissions.delete === "all" || (this.forum_data.permissions.delete === "own" && this.topic_data.topic_info.own)) {
      return true;
    } else if (id == this.topic_data.topic_info.watcher) {
      let time = parseInt(created_at, 10)*1000;
      return moment(time).add('1', 'hours').unix() > moment().unix();
    }
  }

  editValid(id, created_at): boolean {
    if (this.forum_data.permissions.edit === "all") {
      return true;
    } else if (id == this.topic_data.topic_info.watcher) {
      let time = parseInt(created_at, 10)*1000;
      return moment(time).add('1', 'hours').unix() > moment().unix();
    }
  }

  topicSubscribe() {
    this._topicService.topic_subscribe(this.topic_id).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        } else {
          if (response.subscribed) {
            this._notifierService.notify('success', "Te has subscrito a este tema.");
            this.topic_data.topic_info.subscribed = true;
          } else {
            this._notifierService.notify('info', "Ya no estás subscrito a este tema.");
            this.topic_data.topic_info.subscribed = false;
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        }
      }
    );
  }

  topicPin() {
    this._topicService.topic_pin(this.topic_id).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el anclaje del tema.");
        } else {
          if (response.pinned) {
            this._notifierService.notify('success', "Haz anclado el tema.");
            this.topic_data.topic_info.pinned = true;
          } else {
            this._notifierService.notify('info', "Haz desanclado el tema.");
            this.topic_data.topic_info.pinned = false;
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el anclaje del tema.");
        }
      }
    );
  }

  topicLock() {
    this._topicService.topic_lock(this.topic_id).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el bloqueo del tema.");
        } else {
          if (response.locked) {
            this._notifierService.notify('success', "Haz bloqueado el tema.");
            this.topic_data.topic_info.locked = true;
            this.can_reply = false;
          } else {
            this._notifierService.notify('info', "Haz desbloqueado el tema.");
            this.topic_data.topic_info.locked = false;
            if (this.forum_data.permissions.comment === "all") this.can_reply = true;
            if (this.forum_data.permissions.comment === "own" && this.topic_data.topic_info.own) this.can_reply = true;
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el bloqueo del tema.");
        }
      }
    );
  }

  topicOfficial() {
    this._topicService.topic_official(this.topic_id).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el tema.");
        } else {
          if (response.official) {
            this._notifierService.notify('success', "Haz marcado el tema como oficial.");
            this.topic_data.topic_info.official = true;
          } else {
            this._notifierService.notify('info', "Haz desmarcado el tema como oficial.");
            this.topic_data.topic_info.official = false;
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el tema.");
        }
      }
    );
  }

  topicDelete() {
    if (confirm("¿Estás seguro de que quieres eliminar este tema?")) {
      this._topicService.topic_delete(this.topic_id).subscribe(
        response => {
          if (response.deleted) {
            this._notifierService.notify('success', "El tema se ha eliminado correctamente.");
            this._router.navigate(['/foro/' + this.forum_data.breadcrumb.actual._id]);
          } else {
            this._notifierService.notify('error', "Ha ocurrido un error al eliminar el tema.");
          }
        },
        error => {
          let error_message = <any> error;
          if(error_message != null) {
            this._notifierService.notify('error', "Ha ocurrido un error al eliminar el tema.");
          }
        }
      );
    }
  }

  likePost(id: string, index: number) {
    this._topicService.post_like(id).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        } else {
          if (response.liked) {
            this._notifierService.notify('success', "Has marcado un like para este mensaje.");
            this.posts[index].likes = this.posts[index].likes + 1;
          } else {
            this._notifierService.notify('info', "Has eliminado tu like para este mensaje.");
            this.posts[index].likes = this.posts[index].likes - 1;
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        }
      }
    );
  }

  deletePost(id: string, index: any) {
    if (confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
      this._topicService.post_delete(id).subscribe(
        response => {
          if (!response.deleted) {
            this._notifierService.notify('error', "Ha ocurrido un error eliminando el mensaje.");
          } else {
            this._notifierService.notify('success', "Se ha eliminado el mensaje y todos aquellos que lo citaron.");
          }
        },

        error => {
          let error_message = <any> error;
          if(error_message != null) {
            this._notifierService.notify('error', "Ha ocurrido un error al eliminar el mensaje.");
          }
        }
      );
    }
  }
}
