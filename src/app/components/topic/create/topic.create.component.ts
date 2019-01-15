import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from "../../../../../text_editor";
import {faBookmark, faLock, faPlus, faThumbtack} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Topic} from '../../../models/forum/topic';
import {TopicService} from '../../../services/topic.service';
import {NotifierService} from 'angular-notifier';
import {UserService} from '../../../services/user.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'topic-create',
  templateUrl: './topic.create.component.html'
})

export class TopicCreateComponent implements OnInit{

  public editor = ClassicEditor;
  public pre_fetch: any = {};
  public topic: Topic;
  faPlus = faPlus;
  faLock = faLock;
  faThumbtack = faThumbtack;
  faBookmark = faBookmark;

  constructor(
    private _notifierService: NotifierService,
    private _topicService: TopicService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _socket: Socket,
    private _userService: UserService
  ) {
    this.topic = new Topic("","","","","","",[],false,false,false);
  }

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.pre_fetch = data.TopicCreateGuard.pre_fetch;
    }));
  }

  onSubmit() {
    this.topic.forum = this._route.snapshot.queryParams.forum;
    this._topicService.topic_create(this.topic).subscribe(
      response => {
        if (response) {
          this._socket.emit("new_topic", {watcher: this._userService.getToken(), id: response.topic._id});
          this._notifierService.notify('success', "Haz creado el tema exitosamente.");
          this._router.navigate(['/foro/tema/' + response.topic._id]);
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al crear el tema.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }


}
