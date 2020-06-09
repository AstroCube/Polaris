import {IModel} from "./IModel";
import {IPunishment} from "./IPunishment";
import {IUser} from "./user/IUser";
import {IAppealsPermissions} from "./permissions/IAppealsPermissions";

export interface IAppeal extends IModel {
    punishment: IPunishment;
    registeredAddress: string;
    actions: IAppealAction[];
    supervisor: IUser;
    appealed: boolean;
    escalated: boolean;
    closed: boolean;
    locked: boolean;
}

export interface IAppealAction {
    type: IAppealActionType;
    user: IUser;
    createdAt: any;
    content: string;
}

export interface IAppealCreation {
  punishment: string;
  comment: string;
  registeredAddress: string;
}

export enum IAppealActionType {
    Open = 'Open',
    Close = 'Close',
    Lock = 'Lock',
    Unlock = 'Unlock',
    Comment = 'Comment',
    Escalate = 'Escalate',
    Create = 'Create',
    Appeal = 'Appeal',
    UnAppeal = 'UnAppeal',
    Supervised = 'Supervised'
}

export interface IAppealCreation {
    punishment: string;
    comment: string;
    registeredAddress: string;
}

export interface IAppealMain {
  user: IUser;
  punishments: IPunishment[];
  appeals: IAppeal[];
  ip: string;
}

export interface IAppealResolve {
  user: IUser;
  appeal: IAppeal;
  permissions: IAppealsPermissions;
}
