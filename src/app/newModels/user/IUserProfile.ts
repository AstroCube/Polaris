import {IUser} from './IUser';
import {Map} from '../../models/minecraft/map';
import {Punishment} from '../../models/punishment';
import {IMatchProfile} from '../match/IMatchProfile';
import {IFriendProfile} from '../friend/IFriendProfile';

export interface IUserProfile {
  user: IUser;
  maps: Map[];
  punishments: Punishment[];
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
  generalAccess: boolean;
}
