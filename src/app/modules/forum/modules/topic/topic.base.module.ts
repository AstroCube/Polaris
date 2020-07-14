import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {TopicCreateComponent} from "./components/create/topic.create.component";
import {TopicEditComponent} from "./components/edit/topic.edit.component";
import {TopicReplyComponent} from "./components/reply/topic.reply.component";
import {TopicViewComponent} from "./components/view/topic.view.component";
import {TopicCreateGuard} from "./guards/topic.create.guard";
import {TopicEditGuard} from "./guards/topic.edit.guard";
import {TopicReplyGuard} from "./guards/topic.reply.guard";
import {TopicViewGuard} from "./guards/topic.view.guard";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ForumBaseModule} from "../base/forum.base.module";
import {EpsilonModule} from "../../../../epsilon.module";
import {CommonModule} from "@angular/common";

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
        ForumBaseModule,
        EpsilonModule,
        CommonModule
    ],
  providers: [
    TopicCreateGuard,
    TopicEditGuard,
    TopicReplyGuard,
    TopicViewGuard
  ],
  exports: []
})
export class TopicBaseModule { }
