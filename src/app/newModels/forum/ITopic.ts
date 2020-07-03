import {IModel} from "../IModel";
import {IForum} from "./IForum";
import {IUser} from "../user/IUser";

export interface ITopic extends IModel {
    subject: string;
    author: IUser;
    forum: IForum;
    subscribers: IUser[] | string[];
    pinned: boolean;
    official: boolean;
    locked: boolean;
}
