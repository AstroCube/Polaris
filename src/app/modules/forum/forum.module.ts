import { NgModule } from '@angular/core';
import {ForumMainGuard} from "./modules/base/guards/forum.main.guard";
import {ForumViewGuard} from "./modules/base/guards/forum.view.guard";
import {ForumRouting} from "./forum.routing";
@NgModule({
  declarations: [
  ],
  imports: [
    ForumRouting
  ],
  exports: [
  ],
  providers: [
    ForumMainGuard,
    ForumViewGuard
  ]
})
export class ForumModule { }
