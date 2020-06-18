import { NgModule } from '@angular/core';
import {GroupStaffComponent} from "./components/staff/group.staff.component";
import {GroupStaffGuard} from "./guards/group.staff.guard";
import {GroupRouting} from "./group.routing";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    GroupStaffComponent
  ],
  imports: [
    GroupRouting,
    CommonModule
  ],
  providers: [
    GroupStaffGuard
  ]
})
export class GroupModule { }
