import {Component, OnInit} from '@angular/core';

import {ITopic} from "../../../../../../newModels/forum/ITopic";
import {TopicService} from "../../../../../../services/forum/topic.service";
import {IUser, IUserPlaceholder} from "../../../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../../../utilities/group-placeholder";
import {interval, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'forum-feed',
  templateUrl: './forum.feed.component.html'
})

export class ForumFeedComponent implements OnInit {

  public topics: ITopic[];

  constructor(
    private topicService: TopicService
  ) { }

  ngOnInit() {
    this.topicService.newTopics().pipe(
      map(t => this.topics = t.data),
      interval(30000)
    );
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

}
