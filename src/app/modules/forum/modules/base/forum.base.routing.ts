import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumViewComponent} from "./components/view/forum.view.component";
import {ForumMainComponent} from "./components/main/forum.main.component";
import {ForumViewGuard} from "./guards/forum.view.guard";
import {ForumMainGuard} from "./guards/forum.main.guard";

const routes: Routes = [
  {path: ":id", component: ForumViewComponent, resolve: {ForumViewGuard}},
  {path: "", component: ForumMainComponent, resolve: {ForumMainGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumBaseRouting { }
