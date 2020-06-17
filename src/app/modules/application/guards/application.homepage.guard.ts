import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TopicService} from '../../../services/topic.service';
import {Topic} from '../../../models/forum/topic';
import {Post} from '../../../models/forum/post';

@Injectable()
export class ApplicationHomepageGuard {

  private forum : string = "5e1145c5485a5f328baa709d";

  constructor (
    private _topicService: TopicService,
    private _router: Router
  )
  {}

  resolve(): Promise<any> {
    return this.getData().then(response => {
      if (response) {
        return response;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      return false;
    });
  }

  async getData() {
    let data : Post[] = [];
    await this._topicService.topicHomepage(this.forum).then(async (response) => {
      await response.forEach(async (topic) => {
        return await this._topicService.topicHomepagePosts(topic._id).then((post) => {
          post.topic_title = topic.subject;
          post.topic_id = topic._id;
          data.push(post);
        }).catch((err) => {
          switch (err.status) {
            case 404: {
              this._router.navigate(['/error'] , { queryParams: {type: "404"}});
              return false;
            }
            case 403: {
              this._router.navigate(['/error'] , { queryParams: {type: "403"}});
              return false;
            }
            default: {
              this._router.navigate(['/error'] , { queryParams: {type: "500"}});
              return false;
            }
          }
        });
      });
    }).catch(() => {
    });
    return data;
  }
}
