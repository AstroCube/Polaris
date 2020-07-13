import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from "../../../../../../../../text_editor";
import {ActivatedRoute, Router} from '@angular/router';
import {TopicService} from '../../../../../../services/forum/topic.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../../../../services/global';
import {Title} from '@angular/platform-browser';
import {IForum} from "../../../../../../newModels/forum/IForum";
import {ITopic} from "../../../../../../newModels/forum/ITopic";

@Component({
  selector: 'topic-create',
  templateUrl: './topic.create.component.html'
})

export class TopicCreateComponent implements OnInit{

  public editor = ClassicEditor;
  public forum: IForum;
  public topic: ITopic;

  constructor(
    private titleService: Title,
    private notifierService: NotifierService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle("Crear tema - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.forum = data.TopicCreateGuard;
      this.topic = {} as ITopic;
    }));
  }

  onSubmit() {
    this.topic.forum = this.forum._id;
    this.topicService.create(this.topic).subscribe(
      response => {
        if (response) {
          this.notifierService.notify('success', "Haz creado el tema exitosamente.");
          this.router.navigate(['/foro/tema/' + response._id]);
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
