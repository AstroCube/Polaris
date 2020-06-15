import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {AppealMainComponent} from "./components/main/appeal.main.component";
import {AppealMainGuard} from "./guards/appeal.main.guard";
import {AppealListGuard} from "./guards/appeal.list.guard";
import {AppealListComponent} from "./components/list/appeal.list.component";
import {AppealGlobalGuard} from "./guards/appeal.global.guard";
import {AppealGlobalComponent} from "./components/global/appeal.global.component";
import {AppealViewComponent} from "./components/view/appeal.view.component";
import {AppealViewGuard} from "./guards/appeal.view.guard";
import {AppModule} from "../../app.module";

@NgModule({
  declarations: [
    AppealMainComponent,
    AppealListComponent,
    AppealViewComponent,
    AppealGlobalComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FontAwesomeModule,
    FormsModule,
    MomentModule,
    RouterModule
  ],
  providers: [
    AppealMainGuard,
    AppealGlobalGuard,
    AppealViewGuard,
    AppealListGuard
  ]
})
export class AppealModule { }
