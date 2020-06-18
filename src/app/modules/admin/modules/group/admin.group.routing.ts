import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupListComponent} from "./components/list/group.list.component";
import {GroupListGuard} from "./guards/group.list.guard";

const routes: Routes = [
  {path: "", component: GroupListComponent, canActivate: [GroupListGuard], resolve: {GroupListGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGroupRouting { }
