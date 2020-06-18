import { NgModule } from '@angular/core';
import {ForumCreateComponent} from "./components/create/forum.create.component";
import {ForumEditComponent} from "./components/edit/forum.edit.component";
import {ForumListComponent} from "./components/list/forum.list.component";
import {ForumCreateGuard} from "./guards/forum.create.guard";
import {ForumEditGuard} from "./guards/forum.edit.guard";
import {ForumListGuard} from "./guards/forum.list.guard";
import {AdminForumRouting} from "./admin.forum.routing";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    ForumCreateComponent,
    ForumEditComponent,
    ForumListComponent
  ],
  imports: [
    AdminForumRouting,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    ForumCreateGuard,
    ForumEditGuard,
    ForumListGuard
  ]
})
export class AdminForumModule { }
