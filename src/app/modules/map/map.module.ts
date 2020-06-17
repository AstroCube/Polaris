import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {MapMainComponent} from "./components/main/map.main.component";
import {MapViewComponent} from "./components/view/map.view.component";
import {MapViewGuard} from "./guards/map.view.guard";
import {MapMainGuard} from "./guards/map.main.guard";

@NgModule({
  declarations: [
    MapMainComponent,
    MapViewComponent
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
    MapViewGuard,
    MapMainGuard
  ]
})
export class MapModule { }
