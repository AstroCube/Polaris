export class Forum {
  constructor(
    public _id: string,
    public name: string,
    public order: number,
    public description: string,
    public category: any,
    public parent: any
  ){}
}
