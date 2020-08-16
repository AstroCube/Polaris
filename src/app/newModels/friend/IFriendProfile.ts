import {IModel} from "../IModel";
import {IUser} from "../user/IUser";

export interface IFriendProfile {
  friends: IFriend[];
  commons: number;
}

export interface IFriend extends IModel {
  sender: IUser | string;
  receiver: IUser | string;
  issuer: IUser | string;
  website: boolean;
}
