import {IModel, IPagination} from "../IModel";
import {IForumCategory, ITopicHolder} from "./IForumCategory";
import {ITopic} from "./ITopic";
import {IPost} from "./IPost";
import {IUser} from "../user/IUser";
import {IForumPermissions} from "../permissions/IForumPermissions";

export interface IForum extends IModel {
    name: string;
    order: number;
    description: string;
    category: IForumCategory | string;
    parent?: IForum | IForumCreationTree | string;
    guest: boolean;
}

export interface IForumCreationTree {
  forumId: string;
  forum: string;
  category: string;
  categoryId: string;
}

export interface IForumMain {
  category: IForumCategory;
  holder: IForumHolder[];
}

export interface IForumHolder {
  forum: IForum;
  unread: number;
  topics: number;
  messages: number;
  lastTopic: ITopic;
}

export interface IForumView {
  child: IForumHolder[];
  permissions: IForumPermissions;
  forum: IForum;
  topic: ITopicHolder[];
  pinned: ITopicHolder[];
  pagination: IPagination;
  user?: IUser;
}
