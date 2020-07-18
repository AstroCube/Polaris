import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumListComponent} from "./components/list/forum.list.component";
import {ForumListGuard} from "./guards/forum.list.guard";
import {ForumEditComponent} from "./components/edit/forum.edit.component";
import {ForumEditGuard} from "./guards/forum.edit.guard";
import {ForumCreateComponent} from "./components/create/forum.create.component";
import {UserLoggedGuard} from "../../../user/guards/user.logged.guard";

const routes: Routes = [
  {path: "", component: ForumListComponent, canActivate: [UserLoggedGuard, ForumListGuard], resolve: {ForumListGuard}},
  {path: "editar/:id", component: ForumEditComponent, canActivate: [UserLoggedGuard, ForumListGuard], resolve: {ForumListGuard, ForumEditGuard}},
  {path: "crear", component: ForumCreateComponent, canActivate: [UserLoggedGuard, ForumListGuard], resolve: {ForumListGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminForumRouting { }
