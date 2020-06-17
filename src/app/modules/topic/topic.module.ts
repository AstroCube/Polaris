import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxSpinnerModule} from "ngx-spinner";
import {TopicCreateComponent} from "./components/create/topic.create.component";
import {TopicEditComponent} from "./components/edit/topic.edit.component";
import {TopicReplyComponent} from "./components/reply/topic.reply.component";
import {TopicViewComponent} from "./components/view/topic.view.component";
import {TopicCreateGuard} from "./guards/topic.create.guard";
import {TopicEditGuard} from "./guards/topic.edit.guard";
import {TopicReplyGuard} from "./guards/topic.reply.guard";
import {TopicViewGuard} from "./guards/topic.view.guard";

@NgModule({
  declarations: [
    TopicCreateComponent,
    TopicEditComponent,
    TopicReplyComponent,
    TopicViewComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    MomentModule,
    RouterModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
  providers: [
    TopicCreateGuard,
    TopicEditGuard,
    TopicReplyGuard,
    TopicViewGuard
  ],
  exports: []
})
export class TopicModule { }
