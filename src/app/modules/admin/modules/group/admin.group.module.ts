import { NgModule } from '@angular/core';
import {GroupListComponent} from "./components/list/group.list.component";
import {GroupListGuard} from "./guards/group.list.guard";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {AdminGroupRouting} from "./admin.group.routing";
import {EpsilonModule} from "../../../../epsilon.module";

@NgModule({
  declarations: [
    GroupListComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        AdminGroupRouting,
        NgSelectModule,
        EpsilonModule
    ],
  providers: [
    GroupListGuard
  ]
})
export class AdminGroupModule { }
