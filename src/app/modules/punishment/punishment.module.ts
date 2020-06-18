import { NgModule } from '@angular/core';
import {PunishmentCreateComponent} from "./components/create/punishment.create.component";
import {PunishmentEditComponent} from "./components/edit/punishment.edit.component";
import {PunishmentListComponent} from "./components/list/punishment.list.component";
import {PunishmentViewComponent} from "./components/view/punishment.view.component";
import {PunishmentCreateGuard} from "./guards/punishment.create.guard";
import {PunishmentEditGuard} from "./guards/punishment.edit.guard";
import {PunishmentListGuard} from "./guards/punishment.list.guard";
import {PunishmentViewGuard} from "./guards/punishment.view.guard";
import {PunishmentRouting} from "./punishment.routing";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {EpsilonModule} from "../../epsilon.module";
import {MomentModule} from "ngx-moment";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PunishmentCreateComponent,
    PunishmentEditComponent,
    PunishmentListComponent,
    PunishmentViewComponent
  ],
  imports: [
    PunishmentRouting,
    FormsModule,
    NgSelectModule,
    AngularMyDatePickerModule,
    EpsilonModule,
    MomentModule,
    CommonModule
  ],
  providers: [
    PunishmentCreateGuard,
    PunishmentEditGuard,
    PunishmentListGuard,
    PunishmentViewGuard
  ]
})
export class PunishmentModule { }
