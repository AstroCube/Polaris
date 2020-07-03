import {IModel} from "../IModel";
import {IForum} from "./IForum";

export interface IForumCategory extends IModel {
    name: string;
    order: number;
}

export interface ICategoryTree {
  category: IForumCategory;
  tree: IForum[];
}
