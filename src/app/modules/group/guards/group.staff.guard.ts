import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {GroupService} from '../../../services/group.service';
import {Observable} from 'rxjs';
import {IStaffGroup} from "../../../newModels/IGroup";

@Injectable()
export class GroupStaffGuard implements Resolve<IStaffGroup[]> {

  constructor (private groupService: GroupService)
  {}

  resolve(): Observable<IStaffGroup[]> {
    return this.groupService.groupStaffList();
  }

}
