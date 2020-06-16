import {IModel} from "./IModel";
import {IUser} from "./user/IUser";
import {IMatch} from "./match/IMatch";
import {IReport} from "./IReport";

export interface IPunishment extends IModel {
    type: PunishmentType;
    issuer: IUser;
    punished: IUser;
    server: string;
    match: IMatch;
    lastIp: string;
    silent: boolean;
    reason: string;
    evidence: string;
    expires: number;
    automatic: boolean;
    appealed: boolean;
    active: boolean
}

export enum PunishmentType {
    Warn = "Warn", Kick = "Kick", Ban = "Ban"
}

export interface IPunishmentCreateData {
  users: IUser[];
  report: IReport;
  ban: boolean;
  tempBan: boolean;
  kick: boolean;
  warn: boolean;
}
