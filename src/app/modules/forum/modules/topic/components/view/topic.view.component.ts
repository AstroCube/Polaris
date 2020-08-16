import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../../../../services/forum/topic.service';
import {NotifierService} from 'angular-notifier';
import * as moment from 'moment';
import {Title} from '@angular/platform-browser';
import {ITopic, ITopicView} from "../../../../../../newModels/forum/ITopic";
import {IForum} from "../../../../../../newModels/forum/IForum";
import {IUser, IUserPlaceholder} from "../../../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../../../utilities/group-placeholder";
import {ForumPermissible} from "../../../../../../newModels/permissions/IForumPermissions";
import {PostService} from "../../../../../../services/forum/post.service";
import {filter} from "rxjs/operators";
import {IPost} from "../../../../../../newModels/forum/IPost";

@Component({
  selector: 'topic-view',
  templateUrl: './topic.view.component.html'
})

export class TopicViewComponent implements OnInit {

  public view: ITopicView;
  public showSpinner: boolean;

  constructor(
    private titleService: Title,
    private topicService: TopicService,
    private notifierService: NotifierService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showSpinner = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data => {
      this.view = data.TopicViewGuard;
    }));
  }

  quoteLink(id: string) {
    this.router.navigate(['/foro/tema/responder/' + this.view.topic._id], {queryParams: {interact: id}});
  }

  deleteValid(post: IPost, original: boolean): boolean {
    const date: Date = new Date(new Date(post.createdAt).getTime() + (15 * 60000));
    return (
      !original &&
      (this.view.permissions.delete) ||
      (
        date.getTime() > new Date().getTime() &&
        post.author._id === this.view.user._id
      )
    );
  }

  editValid(author: IUser, createdAt): boolean {
    const date: Date = new Date(new Date(createdAt).getTime() + (15 * 60000));
    return (
      this.view.permissions.edit === ForumPermissible.All ||
      ((date.getTime() > new Date().getTime() && this.view.permissions.edit !== ForumPermissible.None) && author._id === this.view.user._id)
    );
  }

  edit(quote: string): void {
    this.router.navigate(['/foro/tema/editar/' + this.view.topic._id], {queryParams: {interact: quote}});
  }

  topicSubscribe() {
    //TODO: Fix at backend
    this.topicService.update({_id: this.view.topic._id, subscribers: [this.view.user._id]} as ITopic).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        } else {
          if ((response.subscribers as string[]).includes(this.view.user._id)) {
            this.notifierService.notify('success', "Te has subscrito a este tema.");
            (this.view.topic.subscribers as string[]).push(this.view.user._id);
          } else {
            this.notifierService.notify('info', "Ya no estás subscrito a este tema.");
            this.view.topic.subscribers = (this.view.topic.subscribers as string[]).filter(f => f !== this.view.user._id);
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        }
      }
    );
  }

  topicPin() {
    this.view.topic.pinned = !this.view.topic.pinned;
    this.topicService.update(this.view.topic).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el anclaje del tema.");
        } else {
          if (response.pinned) {
            this.notifierService.notify('success', "Haz anclado el tema.");
          } else {
            this.notifierService.notify('info', "Haz desanclado el tema.");
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el anclaje del tema.");
        }
      }
    );
  }

  topicLock() {
    this.view.topic.locked = !this.view.topic.locked;
    this.topicService.update(this.view.topic).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el bloqueo del tema.");
        } else {
          if (response.locked) {
            this.notifierService.notify('success', "Haz bloqueado el tema.");
          } else {
            this.notifierService.notify('info', "Haz desbloqueado el tema.");
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el bloqueo del tema.");
        }
      }
    );
  }

  topicOfficial() {
    this.view.topic.official = !this.view.topic.official;
    this.topicService.update(this.view.topic).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el tema.");
        } else {
          if (response.official) {
            this.notifierService.notify('success', "Haz marcado el tema como oficial.");
          } else {
            this.notifierService.notify('info', "Haz desmarcado el tema como oficial.");
          }
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el tema.");
        }
      }
    );
  }

  topicDelete() {
    if (confirm("¿Estás seguro de que quieres eliminar este tema?")) {
      this.topicService.delete(this.view.topic._id).subscribe(
        response => {
          if (response.deleted) {
            this.notifierService.notify('success', "El tema se ha eliminado correctamente.");
            this.router.navigate(['/foro/' + (this.view.topic.forum as IForum)._id]);
          } else {
            this.notifierService.notify('error', "Ha ocurrido un error al eliminar el tema.");
          }
        },
        error => {
          let error_message = <any> error;
          if(error_message != null) {
            this.notifierService.notify('error', "Ha ocurrido un error al eliminar el tema.");
          }
        }
      );
    }
  }

  likePost(id: string, index: number) {
    this.postService.likeStatus(id).subscribe(
      response => {
        if ((this.view.posts.data[index].liked as string[]).includes(this.view.user._id)) {
          (this.view.posts.data[index].liked as string[]).filter(f => f !== this.view.user._id);
        } else {
          (this.view.posts.data[index].liked as string[]).push(this.view.user._id);
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar el like del post.");
        }
      }
    );
  }

  deletePost(id: string, index: any) {
    if (confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
      this.topicService.delete(id).subscribe(
        response => {
          if (!response.deleted) {
            this.notifierService.notify('error', "Ha ocurrido un error eliminando el mensaje.");
          } else {
            this.notifierService.notify('success', "Se ha eliminado el mensaje y todos aquellos que lo citaron.");
          }
        },

        error => {
          let error_message = <any> error;
          if(error_message != null) {
            this.notifierService.notify('error', "Ha ocurrido un error al eliminar el mensaje.");
          }
        }
      );
    }
  }

  public update(page: number): void {
    this.showSpinner = true;
    this.view.posts.data = [];

    this.topicService.view(this.view.topic._id, page, 15).subscribe(
      response => {
        setTimeout(() => {
          this.view = response;
          this.showSpinner = false;
        }, 3000);
      },

      error  => {
        this.router.navigate(['/error'] , { queryParams: {type: "500", message: error.message}});
      }
    );
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  public cast(any: any): any {
    return any;
  }

  public report(user: string): void {
    this.router.navigate(['/reportar/nuevo'], {queryParams: {user}});
  }

}
