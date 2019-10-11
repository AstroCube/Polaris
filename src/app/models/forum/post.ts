export class Post {
  constructor(
    public _id: string,
    public topic_title: string,
    public topic_id: string,
    public content: string,
    public created_at: string,
    public created_by: any,
    public quote: any,
    public last_update: string,
    public last_updater: string,
    public liked_by: string,
    public topic: any,
    public viewed_by: any[]
  ){}
}
