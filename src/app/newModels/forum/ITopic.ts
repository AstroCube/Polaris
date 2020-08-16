import {IModel, IPaginateResult} from "../IModel";
import {IForum} from "./IForum";
import {IUser} from "../user/IUser";
import {IForumPermissions} from "../permissions/IForumPermissions";
import {IPost} from "./IPost";

export interface ITopic extends IModel {
    subject: string;
    author: IUser;
    forum: IForum | string;
    subscribers: IUser[] | string[];
    pinned: boolean;
    official: boolean;
    locked: boolean;
}

export interface ITopicView {
  topic: ITopic;
  user: IUser;
  posts: IPaginateResult<IPost>;
  permissions: IForumPermissions;
}

export interface ITopicCreate {
  forum: IForum;
  user: IUser;
  permissions: IForumPermissions;
}

export interface ITopicInteraction {
  quote?: IPost;
  topic: ITopic;
  original: IPost;
  user: IUser;
}

