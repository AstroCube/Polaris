import { Languages } from "./partial/Languages";
import { IPublicInfo } from "./partial/IPublicInfo";
import { IGameSettings } from "./partial/IGameSettings";
import {IModel} from '../IModel';
import {Group} from '../../models/group';

export interface IUser extends IModel {
  username: string;
  display: string;
  email: string;
  password: string;
  salt: string;
  groups: IUserGroup[];
  skin: string;
  session: IGameSession;
  verified: true;
  level: number;
  experience: number;
  address: IUserIP[];
  discord: IUserDiscord;
  language: Languages;
  publicInfo: IPublicInfo;
  settings: IGameSettings;
}

export interface IUserGroup {
  group: Group;
  joined: string;
  comment: string;
}

export interface IGameSession {
  lastSeen: number;
  lastGame: string;
  lastLobby: string;
  premium: boolean;
}

export interface IUserIP {
  number: string;
  country: string;
  primary: boolean;
}

export interface IUserDiscord {
  id: string;
  access: string;
  refresh: string;
  stamp: string;
}

export interface IPasswordUpdate {
  actual: string;
  password: string;
  confirmation: string;
}

export interface IMailUpdateVerification {
  code: number;
  update: string;
}
