export class Group {
  constructor(
    public _id: String,
    public name: String,
    public priority: Number,
    public html_color: String,
    public badge_color: String,
    public badge_link: String,
    public discord_role: String,
    public minecraft_flair: any[],
    public minecraft_permissions: any[],
    public staff: boolean,
    public web_permissions: any[]
  ){}
}
