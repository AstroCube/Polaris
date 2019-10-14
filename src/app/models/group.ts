export class Group {
  constructor(
    public _id: string,
    public name: string,
    public priority: number,
    public html_color: string,
    public badge_color: string,
    public badge_link: string,
    public discord_role: string,
    public minecraft_flair: any[],
    public minecraft_permissions: any[],
    public staff: boolean,
    public web_permissions: any[]
  ){}
}
