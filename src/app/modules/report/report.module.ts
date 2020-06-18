import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {ReportCreateComponent} from "./components/create/report.create.component";
import {ReportListComponent} from "./components/list/report.list.component";
import {ReportMainComponent} from "./components/main/report.main.component";
import {ReportViewComponent} from "./components/view/report.view.component";
import {ReportCreateGuard} from "./guards/report.create.guard";
import {ReportListGuard} from "./guards/report.list.guard";
import {ReportViewGuard} from "./guards/report.view.guard";
import {ReportService} from "../../services/report.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxSpinnerModule} from "ngx-spinner";
import {ReportRouting} from "./report.routing";

@NgModule({
  declarations: [
    ReportCreateComponent,
    ReportListComponent,
    ReportMainComponent,
    ReportViewComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportRouting,
    MomentModule,
    RouterModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
  providers: [
    ReportCreateGuard,
    ReportListGuard,
    ReportViewGuard,
    ReportService
  ],
  exports: []
})
export class ReportModule { }
