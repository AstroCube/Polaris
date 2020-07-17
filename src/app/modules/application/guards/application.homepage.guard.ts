import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {TopicService} from '../../../services/forum/topic.service';
import {Topic} from '../../../models/forum/topic';
import {Post} from '../../../models/forum/post';
import {IPost} from "../../../newModels/forum/IPost";
import {Observable, of} from "rxjs";

@Injectable()
export class ApplicationHomepageGuard implements Resolve<IPost[]> {

  private forum : string = "5e1145c5485a5f328baa709d";

  constructor (
    private _topicService: TopicService,
    private _router: Router
  )
  {}

  resolve(): Observable<IPost[]> {
    return of([]);
  }
}
