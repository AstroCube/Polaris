import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {GroupListComponent} from "./components/list/group.list.component";
import {GroupStaffComponent} from "./components/staff/group.staff.component";
import {GroupListGuard} from "./guards/group.list.guard";
import {GroupStaffGuard} from "./guards/group.staff.guard";

@NgModule({
  declarations: [
    GroupListComponent,
    GroupStaffComponent
  ],
    imports: [
      CommonModule,
      EpsilonModule,
      FormsModule,
      NgSelectModule,
      MomentModule,
      RouterModule,
      AngularMyDatePickerModule
    ],
  providers: [
    GroupListGuard,
    GroupStaffGuard
  ]
})
export class GroupModule { }
