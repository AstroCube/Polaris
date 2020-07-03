import {IModel} from "../IModel";
import {ITopic} from "./ITopic";
import {IUser} from "../user/IUser";

export interface IPost extends IModel {
    content: string;
    author: IUser;
    quote: IPost | string;
    lastAction: IUser | string;
    topic: ITopic | string;
    viewed: IUser[] | string[];
    liked: IUser[] | string[];
}
