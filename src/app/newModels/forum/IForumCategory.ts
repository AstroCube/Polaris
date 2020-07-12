import {IModel} from "../IModel";
import {IForum} from "./IForum";
import {ITopic} from "./ITopic";
import {IPost} from "./IPost";

export interface IForumCategory extends IModel {
    name: string;
    order: number;
}

export interface ICategoryTree {
  category: IForumCategory;
  tree: IForum[];
}

export interface ITopicHolder {
  topic: ITopic;
  unread: number;
  messages: number;
  views: number;
  lastPost: IPost;
}
