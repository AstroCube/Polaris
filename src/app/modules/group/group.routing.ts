import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupStaffComponent} from "./components/staff/group.staff.component";
import {GroupStaffGuard} from "./guards/group.staff.guard";

const routes: Routes = [
  {path: '', component: GroupStaffComponent, resolve: {GroupStaffGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRouting { }
