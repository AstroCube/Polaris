import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../services/topic.service';
import * as ClassicEditor from "../../../../../text_editor";
import {GLOBAL} from '../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'topic-edit',
  templateUrl: './topic.edit.component.html'
})

export class TopicEditComponent implements OnInit {

  public editor = ClassicEditor;
  public forum_data: any;
  public original_post: any;
  public topic_data: any;
  public post_id: string;
  public post: any;

  constructor(
    private _titleService: Title,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {}

  ngOnInit() {
    this._titleService.setTitle("Editar tema - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.forum_data = data.TopicEditGuard.forum_data;
      this.original_post = data.TopicEditGuard.topic_data.posts;
      this.topic_data = data.TopicEditGuard.topic_data;
      this.post = data.TopicEditGuard.post_data;
    }));
    this.post_id = this._route.snapshot.params.id;
    this.post.subject = this.topic_data.topic_info.subject;
  }

  onSubmit() {
    this._topicService.post_update(this.post_id, this.post).subscribe(
      response => {
        if (response.updated) {
          this._notifierService.notify('success', "Haz editado el mensaje.");
          this._router.navigate(['/foro/tema/' + this.topic_data.topic_info.id]);
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al editar el mensaje.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al editar el mensaje.");
        }
      }
    );
  }
}
