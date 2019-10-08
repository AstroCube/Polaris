export class Gamemode {
  constructor(
    public _id: string,
    public name: string,
    public scoreboard: string,
    public lobby: string,
    public navigator: string,
    public slot: number,
    public sub_types: any
  ) {}
}
