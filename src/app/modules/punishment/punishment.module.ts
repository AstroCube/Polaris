import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {PunishmentCreateComponent} from "./components/create/punishment.create.component";
import {PunishmentEditComponent} from "./components/edit/punishment.edit.component";
import {PunishmentListComponent} from "./components/list/punishment.list.component";
import {PunishmentViewComponent} from "./components/view/punishment.view.component";
import {PunishmentCreateGuard} from "./guards/punishment.create.guard";
import {PunishmentEditGuard} from "./guards/punishment.edit.guard";
import {PunishmentListGuard} from "./guards/punishment.list.guard";
import {PunishmentViewGuard} from "./guards/punishment.view.guard";
import {MyDatePickerModule} from "mydatepicker";

@NgModule({
  declarations: [
    PunishmentCreateComponent,
    PunishmentEditComponent,
    PunishmentListComponent,
    PunishmentViewComponent
  ],
    imports: [
        CommonModule,
        EpsilonModule,
        FontAwesomeModule,
        FormsModule,
        NgSelectModule,
        MomentModule,
        RouterModule,
        MyDatePickerModule
    ],
  providers: [
    PunishmentCreateGuard,
    PunishmentEditGuard,
    PunishmentListGuard,
    PunishmentViewGuard
  ]
})
export class PunishmentModule { }
