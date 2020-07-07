import {forkJoin, Observable, of} from "rxjs";
import {IForum, IForumHolder, IForumMain} from "../newModels/forum/IForum";
import {Injectable} from "@angular/core";
import {ForumService} from "../services/forum/forum.service";
import {TopicService} from "../services/forum/topic.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {PostService} from "../services/forum/post.service";
import {UserService} from "../services/user.service";
import {ITopic} from "../newModels/forum/ITopic";
import {IUser} from "../newModels/user/IUser";
import {IForumCategory} from "../newModels/forum/IForumCategory";

@Injectable()
export class ForumUtilities {

  constructor(
    private forumService: ForumService,
    private userService: UserService,
    private topicService: TopicService,
    private postService: PostService
  ) {
  }

  /**
   * Get forum main and holders for category
   * @param category
   */
  public getCategoryHolders(category: IForumCategory): Observable<IForumMain> {
    return this.forumService.list(-1, 10, {category: category._id}).pipe(
      mergeMap(forums =>
        forkJoin(
          forums.data.map(forums => this.getHolder(forums))
        ).pipe(
          map(holders => ({
            category,
            holder: holders
          } as IForumMain))
        )
      )
    );
  }

  /**
   * Get holder for one forum to be displayed at main page
   * @param forum
   */
  public getHolder(forum: IForum): Observable<IForumHolder> {
    return this.userService.getUserObservable().pipe(
      mergeMap(user =>
        this.topicService.list(-1, 10, {forum: forum._id}).pipe(
          mergeMap(topics =>
            forkJoin([
              this.getUnreadMessages(forum, user),
              this.postService.list(-1, 10, {$in: topics.data.map(t => t._id)}, 'createdAt')
            ]).pipe(
              map(response => ({
                forum,
                unread: response[0],
                topics: topics.data.length,
                messages: response[1].data.length,
                lastTopic: topics.data[0]
              }) as IForumHolder)
            )
          )
        )
      )
    );
  }

  /**
   * Will return topics where user is actually subscribed
   * @param forum to search
   * @param user to search
   */
  public getSubscribedTopics(forum: IForum, user: IUser): Observable<ITopic[]> {
    return this.topicService.list(-1, 10, {forum: forum._id, subscribers: user._id}).pipe(
      map(topics => topics.data),
      catchError(error => of([]))
    )
  }

  /**
   * Will return unread messages of the current forum
   * @param forum to be searched
   * @param user to be searched
   */
  public getUnreadMessages(forum: IForum, user: IUser): Observable<number> {
    return this.getSubscribedTopics(forum, user).pipe(
      mergeMap(topics =>
        this.postService.list(-1, 10, {topic: {$in: topics.map(t => t._id)}}).pipe(
          map(posts => posts.data.length)
        )
      ),
      catchError(error => of(0))
    );
  }

}
