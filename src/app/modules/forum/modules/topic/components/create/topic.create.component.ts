import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from "../../../../../../../../text_editor";
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../../../../services/forum/topic.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IForum} from "../../../../../../newModels/forum/IForum";
import {ITopic} from "../../../../../../newModels/forum/ITopic";
import {IForumPermissions} from "../../../../../../newModels/permissions/IForumPermissions";
import {IPost} from "../../../../../../newModels/forum/IPost";
import {mergeMap} from "rxjs/operators";
import {PostService} from "../../../../../../services/forum/post.service";

@Component({
  selector: 'topic-create',
  templateUrl: './topic.create.component.html'
})

export class TopicCreateComponent implements OnInit{

  public editor = ClassicEditor;
  public forum: IForum;
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
    //TODO: Check topic permissions (And check officialize)
    this.titleService.setTitle("Crear tema - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.forum = data.TopicCreateGuard;
      this.topic = {} as ITopic;
    }));
  }

  onSubmit() {
    this.topic.forum = this.forum._id;
    this.topicService.create(this.topic).pipe(
      mergeMap(topic => this.postService.create({...this.post, topic: (topic as ITopic)._id}))
    ).subscribe(
      response => {
        if (response) {
          this.notifierService.notify('success', "Haz creado el tema exitosamente.");
          this.router.navigate(['/foro/tema/' + (response.topic as ITopic)._id]);
        } else {
          this.notifierService.notify('error', "Ha ocurrido un error al crear el tema.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }


}
