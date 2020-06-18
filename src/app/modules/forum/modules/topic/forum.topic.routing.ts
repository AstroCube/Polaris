import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopicEditComponent} from "./components/edit/topic.edit.component";
import {TopicEditGuard} from "./guards/topic.edit.guard";
import {TopicReplyComponent} from "./components/reply/topic.reply.component";
import {TopicReplyGuard} from "./guards/topic.reply.guard";
import {TopicCreateComponent} from "./components/create/topic.create.component";
import {TopicCreateGuard} from "./guards/topic.create.guard";
import {TopicViewComponent} from "./components/view/topic.view.component";
import {TopicViewGuard} from "./guards/topic.view.guard";

const routes: Routes = [
  {path: "editar/:id", component: TopicEditComponent, canActivate: [TopicEditGuard], resolve: {TopicEditGuard}},
  {path: "responder/:id", component: TopicReplyComponent, canActivate: [TopicReplyGuard], resolve: {TopicReplyGuard}},
  {path: "crear", component: TopicCreateComponent, canActivate: [TopicCreateGuard], resolve: {TopicCreateGuard}},
  {path: ":id/:page", component: TopicViewComponent, canActivate: [TopicViewGuard], resolve: {TopicViewGuard}},
  {path: ":id", component: TopicViewComponent, canActivate: [TopicViewGuard], resolve: {TopicViewGuard}},
  {path: "", redirectTo: "/error?type=404", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumTopicRouting { }
