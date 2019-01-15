export class Action {
  constructor(
    public _id: String,
    public type: String,
    public realm: String,
    public username: any[],
    public content: String
  ){}
}
