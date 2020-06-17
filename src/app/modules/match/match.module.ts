import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {MatchViewComponent} from "./components/view/match.view.component";
import {MatchViewGuard} from "./guards/match.view.guard";

@NgModule({
  declarations: [
    MatchViewComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    NgSelectModule,
    MomentModule,
    RouterModule,
    AngularMyDatePickerModule
  ],
  providers: [
    MatchViewGuard
  ]
})
export class MatchModule { }
