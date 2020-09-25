import {IUser} from './IUser';
import {Map} from '../../models/minecraft/map';
import {IMatchProfile} from '../match/IMatchProfile';
import {IFriendProfile} from '../friend/IFriendProfile';
import {IPunishment} from "../IPunishment";
import {IMap} from "../IMap";

export interface IUserProfile {
  user: IUser;
  maps: IMap[];
  punishments: IPunishment[];
  friends: IFriendProfile;
  lastMatches: IMatchProfile;
}

export interface IUserProfileDiscord {
  avatar: string;
  username: string;
}

export interface IHeaderUser {
  user: IUser;
  group: boolean;
  category: boolean;
  userEdit: boolean;
  forum: boolean;
  maps: boolean;
  generalAccess: boolean;
}
