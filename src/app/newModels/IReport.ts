import {IModel, IPaginateResult} from "./IModel";
import {IPunishment} from "./IPunishment";
import {IUser} from "./user/IUser";
import {IReportsPermissions} from "./permissions/IReportsPermissions";

export interface IReport extends IModel {
  punishment: IPunishment;
  registeredAddress: string;
  issuer: IUser;
  involved: IUser;
  assigned: IUser;
  actions: IReportAction[];
  rule: string;
  evidence: string;
  miscellaneous: string;
  closed: boolean;
}

export interface IReportAction {
  type: ReportActionType;
  user: IUser;
  createdAt: string;
  content: string;
}

export enum ReportActionType {
  Open =  'Open', Close = 'Close', Punish = 'Punish', UnPunish = 'UnPunish', Comment = 'Comment'
}

export interface IReportCreation {
  issuer: IUser;
  involved: IUser;
  rule: string;
  evidence: string;
  miscellaneous: string;
  registeredAddress: string;
}

export interface IReportView {
  user: IUser;
  report: IReport;
  permissions: IReportsPermissions;
}

export interface IReportList {
  user: IUser;
  reports: IPaginateResult<IReport>;
  permissions: IReportsPermissions;
}

export interface IReportSearch {
  query: any;
  criteria: ReportSearchCriteria;
}

export enum ReportSearchCriteria {
  All = 'All', Open = 'Open', Closed = 'Closed', Waiting = 'Waiting'
}
