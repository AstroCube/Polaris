import {Map} from './map';
import {Team} from './team';
import {User} from '../user';
import {Gamemode} from './gamemode';

export class Match {
  constructor(
    public _id: string,
    public map: Map,
    public createdAt: string,
    public teams: Team[],
    public winner: any,
    public status: string,
    public gamemode: Gamemode,
    public subGamemode: string
  ) {}
}
