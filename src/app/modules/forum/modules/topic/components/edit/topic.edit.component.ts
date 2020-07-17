import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../../../../services/forum/topic.service';
import * as ClassicEditor from "../../../../../../../../text_editor";
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {ITopic, ITopicEdit} from "../../../../../../newModels/forum/ITopic";
import {PostService} from "../../../../../../services/forum/post.service";

@Component({
  selector: 'topic-edit',
  templateUrl: './topic.edit.component.html'
})

export class TopicEditComponent implements OnInit {

  public editor = ClassicEditor;
  public data: ITopicEdit;

  constructor(
    private titleService: Title,
    private notifierService: NotifierService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Editar tema - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.data = data.TopicEditGuard;
    }));
  }

  onSubmit() {
    if (this.data.original._id === this.data.post._id) {
      this.topicService.update(this.data.post.topic as ITopic).subscribe(
        response => {
          this.router.navigate(['/foro/tema/' + response._id]);
        },

        error => {
          let error_message = <any> error;
          if(error_message != null) {
            this.notifierService.notify('error', "Ha ocurrido un error al editar el mensaje.");
          }
        }
      );
    }

    this.postService.update(this.data.post).subscribe(
      response => {
        this.notifierService.notify('success', "Haz editado el mensaje.");
        this.router.navigate(['/foro/tema/' + (this.data.post.topic as ITopic)._id]);
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al editar el mensaje.");
        }
      }
    );
  }

  public cast(any: any): any {
    return any;
  }
}
