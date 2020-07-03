import {IModel} from "../IModel";
import {IForumCategory} from "./IForumCategory";

export interface IForum extends IModel {
    name: string;
    order: number;
    description: string;
    category: IForumCategory;
    parent?: IForum;
    guest: boolean;
}

export interface IForumCreationTree {
  forumId: string;
  forum: string;
  category: string;
  categoryId: string;
}
