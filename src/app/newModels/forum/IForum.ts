import {IModel} from "../IModel";
import {IForumCategory} from "./IForumCategory";
import {ITopic} from "./ITopic";

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
