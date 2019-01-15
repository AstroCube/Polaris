export class Punishment {
  constructor(
    public type: any,
    public punisher: String,
    public punished: any,
    public server: String,
    public match: String,
    public last_ip: String,
    public created_at: String,
    public reason: String,
    public evidence: String,
    public expires: any,
    public automatic: Boolean,
    public appealed: Boolean,
    public active: Boolean
  ){}
}
