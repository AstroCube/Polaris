export class Appeal {
  constructor(
    public punishment: any,
    public created_at: String,
    public creator_ip: String,
    public actions: any[],
    public escalated: Boolean,
    public escalated_assigned: any,
    public closed: Boolean,
    public locked: Boolean
  ){}
}
