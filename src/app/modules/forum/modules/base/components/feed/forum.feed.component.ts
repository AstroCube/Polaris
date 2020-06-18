import {Component, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {UserService} from '../../../../../../services/user.service';

@Component({
  selector: 'forum-feed',
  templateUrl: './forum.feed.component.html'
})

export class ForumFeedComponent implements OnInit{

  public feed_event = this._socket.fromEvent<any[]>("feed_topics");
  public create_new = this._socket.fromEvent<any[]>("receive_topic");
  public topics: any[];
  public viewable: any[];

  constructor(
    private __userService: UserService,
    private _socket: Socket
  ) { }

  ngOnInit() {
    this.loadFeed();

    this.feed_event.subscribe(
      response => {
        let respond: any = response;
        this.topics = respond.topics;
        this.viewable = respond.viewable;
      }
    );

    this.create_new.subscribe(
      response => {
        let topic: any = response;
        if (this.viewable.includes(topic.forum.toString()) && this.topics.filter(element => element.id === topic.id).length <= 0) {
          this.topics.unshift(topic);
        }
      }
    );
  }

  loadFeed() {
    this._socket.emit("feed_join", this.__userService.getToken());
  }

}
