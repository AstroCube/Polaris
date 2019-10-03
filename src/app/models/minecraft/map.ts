import {User} from '../user';

export class Map {
  constructor(
    public _id: string,
    public name: string,
    public file: string,
    public configuration: string,
    public image: string,
    public author: User,
    public version: string,
    public contributors: any,
    public gamemode: string,
    public subGamemode: string,
    public description: string,
    public rating: any,
    public registeredDate: string
  ) {}
}
