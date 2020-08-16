import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopicEditComponent} from "./components/edit/topic.edit.component";
import {TopicReplyComponent} from "./components/reply/topic.reply.component";
import {TopicInteractGuard} from "./guards/topic.interact.guard";
import {TopicCreateComponent} from "./components/create/topic.create.component";
import {TopicCreateGuard} from "./guards/topic.create.guard";
import {TopicViewComponent} from "./components/view/topic.view.component";
import {TopicViewGuard} from "./guards/topic.view.guard";

const routes: Routes = [
  {path: "crear", component: TopicCreateComponent, canActivate: [TopicCreateGuard], resolve: {TopicCreateGuard}},
  {path: "editar/:id", component: TopicEditComponent, resolve: {TopicInteractGuard}},
  {path: "responder/:id", component: TopicReplyComponent, resolve: {TopicInteractGuard}},
  {path: ":id/:page", component: TopicViewComponent, canActivate: [TopicViewGuard], resolve: {TopicViewGuard}},
  {path: ":id", component: TopicViewComponent, canActivate: [TopicViewGuard], resolve: {TopicViewGuard}},
  {path: "", redirectTo: "/error?type=404", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumTopicRouting { }
