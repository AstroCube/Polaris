import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumListComponent} from "./components/list/forum.list.component";
import {ForumListGuard} from "./guards/forum.list.guard";
import {ForumEditComponent} from "./components/edit/forum.edit.component";
import {ForumEditGuard} from "./guards/forum.edit.guard";
import {ForumCreateComponent} from "./components/create/forum.create.component";
import {ForumCreateGuard} from "./guards/forum.create.guard";

const routes: Routes = [
  {path: "", component: ForumListComponent, canActivate: [ForumListGuard], resolve: {ForumListGuard}},
  {path: "editar/:id", component: ForumEditComponent, canActivate: [ForumEditGuard], resolve: {ForumEditGuard}},
  {path: "crear", component: ForumCreateComponent, canActivate: [ForumCreateGuard], resolve: {ForumCreateGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminForumRouting { }
