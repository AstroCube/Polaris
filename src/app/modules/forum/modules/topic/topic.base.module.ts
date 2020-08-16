import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {TopicCreateComponent} from "./components/create/topic.create.component";
import {TopicEditComponent} from "./components/edit/topic.edit.component";
import {TopicReplyComponent} from "./components/reply/topic.reply.component";
import {TopicViewComponent} from "./components/view/topic.view.component";
import {TopicCreateGuard} from "./guards/topic.create.guard";
import {TopicInteractGuard} from "./guards/topic.interact.guard";
import {TopicViewGuard} from "./guards/topic.view.guard";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ForumBaseModule} from "../base/forum.base.module";
import {EpsilonModule} from "../../../../epsilon.module";
import {CommonModule} from "@angular/common";
import {ForumTopicRouting} from "./forum.topic.routing";

@NgModule({
  declarations: [
    TopicCreateComponent,
    TopicEditComponent,
    TopicReplyComponent,
    TopicViewComponent
  ],
    imports: [
        FormsModule,
        MomentModule,
        CKEditorModule,
        RouterModule,
        ForumTopicRouting,
        ForumBaseModule,
        EpsilonModule,
        CommonModule
    ],
  providers: [
    TopicCreateGuard,
    TopicInteractGuard,
    TopicViewGuard
  ],
  exports: []
})
export class TopicBaseModule { }
