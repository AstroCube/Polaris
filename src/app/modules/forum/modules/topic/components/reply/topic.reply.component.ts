import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from "../../../../../../../../text_editor";
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {ITopicReply} from "../../../../../../newModels/forum/ITopic";
import {IPost} from "../../../../../../newModels/forum/IPost";
import {IUser, IUserPlaceholder} from "../../../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../../../utilities/group-placeholder";
import {PostService} from "../../../../../../services/forum/post.service";

@Component({
  selector: 'topic-reply',
  templateUrl: './topic.reply.component.html'
})

export class TopicReplyComponent implements OnInit {

  public editor = ClassicEditor;
  public data: ITopicReply;
  public post: IPost;

  constructor(
    private titleService: Title,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    this.post = {content: ''} as IPost;
  }

  ngOnInit() {
    this.route.data.subscribe((data => {
      this.data = data.TopicReplyGuard;
      //@ts-ignore
      this.post.author = this.data.user._id;
      this.post.topic = this.data.topic._id;
      if (this.data.quote) this.post.quote = this.data.quote._id;
    }));
    this.titleService.setTitle("Respondiendo a " + this.data.topic.subject + " - " + GLOBAL.title);
  }

  public onSubmit() {
    this.postService.create(this.post).subscribe(
      response => {
        if (response) {
          this.notifierService.notify('success', "Haz escrito un comentario en el tema.");
          this.router.navigate(['/foro/tema/' + this.route.snapshot.params.id]);
        } else {
          this.notifierService.notify('error', "Ha ocurrido un error al comentar el tema.");
        }
      },
      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al comentar el tema.");
        }
      }
    );
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  public cast(any: any): any {
    return any;
  }

}
