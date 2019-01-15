export class User {
  constructor(
    // -- Mandatory fields -- //
    public _id: string,
    public username: string,
    public username_lowercase: string,
    public email: string,
    public password: string,
    public group: any[],
    // -- Automatic fields -- //
    public skin: string,
    public last_seen: string,
    public last_game: string,
    public member_since: Number,
    public level: number,
    public verified: Boolean,
    public used_ips: any[],
    // -- Customizable fields -- //
    public gender: any,
    public occupation: string,
    public location: string,
    public interests: string,
    public public_email: string,
    public twitter: string,
    public reddit: string,
    public discord: any,
    public steam: string,
    public twitch: string,
    public about: string,
    // -- Settings fields -- //
    public subscribe_topics: Boolean,
    public alert_quoted: Boolean,
    public accept_gifts: Boolean,
    public accept_friends : Boolean,
    public show_status: Boolean
  ){}
}
