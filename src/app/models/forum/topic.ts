export class Topic {
  constructor(
    public _id: string,
    public subject: string,
    public created_at: string,
    public created_by: string,
    public forum: any,
    public content: any,
    public subscribers: any[],
    public pinned: boolean,
    public official: boolean,
    public locked: boolean
  ){}
}
