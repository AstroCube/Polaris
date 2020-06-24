import {IModel, IPaginateResult} from "./IModel";
import {IGamemode} from "./IGamemode";
import {IPermissions} from "./IGroup";
import {IUser, IUserPermissionsPair} from "./user/IUser";

export interface IMap extends IModel {
  name: string;
  identifierName: string;
  file: string;
  configuration: string;
  image: string;
  author: string | IUser;
  version: string;
  contributors: IMapContributors[];
  gamemode: string;
  subGamemode: string[];
  description: string;
  rating: IMapRating[];
}

export interface IMapContributors {
  contributor: string | IUser;
  contribution: string;
}

export interface IMapRating {
  star: number;
  user: string;
}

export interface IMapMain {
  gamemodes: IGamemode[];
  selected: IGamemode;
  maps: IPaginateResult<IMap>;
}

export interface IMapView {
  map: IMap;
  permissions: IUserPermissionsPair;
}
