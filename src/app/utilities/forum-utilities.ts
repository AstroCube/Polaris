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
import {IForumCategory, ITopicHolder} from "../newModels/forum/IForumCategory";

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
   * @param user
   */
  public getCategoryHolders(category: IForumCategory, user: IUser): Observable<IForumMain> {
    return this.forumService.list(-1, 10, {category: category._id}).pipe(
      mergeMap(forums =>
        forkJoin(
          forums.data.map(forums => this.getHolder(forums, user))
        ).pipe(
          map(holders => ({
            category,
            holder: holders
          } as IForumMain))
        )
      )
    );
  }

  public getTopicHolders(t: ITopic[], user: IUser): Observable<ITopicHolder[]> {
    return of(t).pipe(
      mergeMap(topics =>
        forkJoin(topics.map(topic => this.getTopicHolder(topic, user)))
      )
    );
  }

  public getChildHolders(f: IForum[], user: IUser): Observable<IForumHolder[]> {
    return of(f).pipe(
      mergeMap(forums =>
        forkJoin(forums.map(forum => this.getHolder(forum, user)))
      )
    );
  }

  public getTopicHolder(topic: ITopic, user?: IUser): Observable<ITopicHolder> {
    return this.postService.list(-1, 10, {topic: topic._id}).pipe(
      map(post => {

        let unique: string[] = [];
        post.data.forEach((p) => unique = unique.concat(p.viewed as string[]));

        return {
          topic: topic,
          unread: post.data.filter(post => (post.viewed as string[]).includes(user ? user._id : '')).length,
          messages: post.data.length,
          views: unique.length,
          lastPost: post.data.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))[0]
        };
      })
    );
  }

  /**
   * Get holder for one forum to be displayed at main page
   * @param forum
   * @param user
   */
  public getHolder(forum: IForum, user: IUser): Observable<IForumHolder> {
    return this.topicService.list(-1, 10, {forum: forum._id}).pipe(
      mergeMap(topics =>
        forkJoin([
          this.getUnreadMessages(forum, user),
          this.postService.list(-1, 10, {topic: {$in: topics.data.map(t => t._id)}}, 'createdAt')
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
    return this.userService.getEpsilonToken() !== "" ? this.getSubscribedTopics(forum, user).pipe(
      mergeMap(topics =>
        this.postService.list(-1, 10, {topic: {$in: topics.map(t => t._id)}, $not: {viewed: user._id}}).pipe(
          map(posts => posts.data.length)
        )
      ),
      catchError(error => of(0))
    ) : of(0);
  }

}
