import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from "../../../../../../../../text_editor";
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../../../../services/forum/topic.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {ITopic, ITopicCreate} from "../../../../../../newModels/forum/ITopic";
import {IForumPermissions} from "../../../../../../newModels/permissions/IForumPermissions";
import {IPost} from "../../../../../../newModels/forum/IPost";
import {map, mergeMap} from "rxjs/operators";
import {PostService} from "../../../../../../services/forum/post.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'topic-create',
  templateUrl: './topic.create.component.html'
})

export class TopicCreateComponent implements OnInit{

  public editor = ClassicEditor;
  public data: ITopicCreate;
  public topic: ITopic;
  public post: IPost;
  public permissions: IForumPermissions;

  constructor(
    private titleService: Title,
    private notifierService: NotifierService,
    private postService: PostService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Crear tema - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.data = data.TopicCreateGuard;
      this.topic = {} as ITopic;
      this.post = {content: ''} as IPost;
    }));
  }

  onSubmit() {
    this.topic.forum = this.data.forum._id;
    //@ts-ignore
    this.topic.author = this.data.user._id;
    this.topicService.create(this.topic).pipe(
      mergeMap(topic =>
        //@ts-ignore
        forkJoin([this.postService.create({...this.post, topic: (topic as ITopic)._id, author: this.data.user._id})]).pipe(
          map(response => ({
            topic,
            forum: response
          }))
        )
      )
    ).subscribe(
      response => {
        if (response) {
          this.notifierService.notify('success', "Haz creado el tema exitosamente.");
          this.router.navigate(['/foro/tema/' + response.topic._id]);
        } else {
          this.notifierService.notify('error', "Ha ocurrido un error al crear el tema.");
        }
      },

      error => {
        console.log(error);
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.message);
        }
      }
    );
  }


}
