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

@NgModule({
  declarations: [
    AppealMainComponent,
    AppealListComponent
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
    AppealListGuard
  ]
})
export class AppealModule { }
