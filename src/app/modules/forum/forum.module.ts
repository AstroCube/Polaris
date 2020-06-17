import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {ForumCreateComponent} from "./components/create/forum.create.component";
import {ForumEditComponent} from "./components/edit/forum.edit.component";
import {ForumFeedComponent} from "./components/feed/forum.feed.component";
import {ForumListComponent} from "./components/list/forum.list.component";
import {ForumMainComponent} from "./components/main/forum.main.component";
import {ForumViewComponent} from "./components/view/forum.view.component";
import {ForumCreateGuard} from "./guards/forum.create.guard";
import {ForumEditGuard} from "./guards/forum.edit.guard";
import {ForumListGuard} from "./guards/forum.list.guard";
import {ForumMainGuard} from "./guards/forum.main.guard";
import {ForumViewGuard} from "./guards/forum.view.guard";
@NgModule({
  declarations: [
    ForumCreateComponent,
    ForumEditComponent,
    ForumFeedComponent,
    ForumListComponent,
    ForumMainComponent,
    ForumViewComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    MomentModule,
    RouterModule
  ],
  providers: [
    ForumCreateGuard,
    ForumEditGuard,
    ForumListGuard,
    ForumMainGuard,
    ForumViewGuard
  ]
})
export class ForumModule { }
