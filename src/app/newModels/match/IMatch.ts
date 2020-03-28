import {Gamemode} from '../../models/minecraft/gamemode';
import {ITeam} from './ITeam';
import {IModel} from '../IModel';
import {MatchStatus} from './Status';

export interface IMatch extends IModel{
  match: string;
  createdAt: string;
  teams: ITeam[];
  winner: any[];
  status: MatchStatus;
  gamemode: Gamemode;
  subGamemode: string;
}
