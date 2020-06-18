import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ForumFeedComponent} from "./components/feed/forum.feed.component";
import {ForumMainComponent} from "./components/main/forum.main.component";
import {ForumViewComponent} from "./components/view/forum.view.component";
import {ForumMainGuard} from "./guards/forum.main.guard";
import {ForumViewGuard} from "./guards/forum.view.guard";
import {EpsilonModule} from "../../../../epsilon.module";
import {MomentModule} from "ngx-moment";
@NgModule({
  declarations: [
    ForumFeedComponent,
    ForumMainComponent,
    ForumViewComponent
  ],
  imports: [
    RouterModule,
    EpsilonModule,
    MomentModule
  ],
  exports: [
    ForumFeedComponent
  ],
  providers: [
    ForumMainGuard,
    ForumViewGuard
  ]
})
export class ForumBaseModule { }
