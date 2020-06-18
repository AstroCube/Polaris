import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from "../../../../../../../../text_editor";
import {TopicService} from '../../../../../../services/topic.service';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../../../../../models/forum/post';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'topic-reply',
  templateUrl: './topic.reply.component.html'
})

export class TopicReplyComponent implements OnInit {

  public editor = ClassicEditor;
  public forum_data: any;
  public original_post: any;
  public topic_data: any;
  public topic_id: string;
  public quote_post: any;
  public post: Post;

  constructor(
    private _titleService: Title,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.forum_data = {};
    this.topic_data = {};
    this.post = new Post("","","","","","","","","","","", []);
  }

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.forum_data = data.TopicReplyGuard.forum_data;
      this.original_post = data.TopicReplyGuard.topic_data.posts;
      this.topic_data = data.TopicReplyGuard.topic_data;
      if (this._route.snapshot.queryParams.quote) this.quote_post = data.TopicReplyGuard.quoted_data.fixed_post;
    }));
    this._titleService.setTitle("Respondiendo a " + this.topic_data.topic_info.subject + " - " + GLOBAL.title);
    this.topic_id = this._route.snapshot.params.id;
  }

  onSubmit() {
    this.post.topic = this._route.snapshot.params.id;
    if (this.quote_post) this.post.quote = this.quote_post.id;
    this._topicService.topic_reply(this.post).subscribe(
      response => {
        if (response) {
          this._notifierService.notify('success', "Haz escrito un comentario en el tema.");
          this._router.navigate(['/foro/tema/' + this._route.snapshot.params.id]);
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al comentar el tema.");
        }
      },
      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al comentar el tema.");
        }
      }
    );
  }
}
