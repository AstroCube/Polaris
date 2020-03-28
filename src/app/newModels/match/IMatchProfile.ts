import {IMatch} from './IMatch';

export interface IMatchProfile {
  wonMatches: number;
  playedMatches: number;
  lastMatches: IMatch[];
}
