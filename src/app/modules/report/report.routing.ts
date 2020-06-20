import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLoggedGuard} from "../user/guards/user.logged.guard";
import {ReportCreateComponent} from "./components/create/report.create.component";
import {ReportViewComponent} from "./components/view/report.view.component";
import {ReportMainComponent} from "./components/main/report.main.component";
import {ReportCreateGuard} from "./guards/report.create.guard";
import {ReportViewGuard} from "./guards/report.view.guard";
import {ReportListComponent} from "./components/list/report.list.component";
import {ReportListGuard} from "./guards/report.list.guard";

const routes: Routes = [
  {path: "lista", component: ReportListComponent, canActivate: [UserLoggedGuard], resolve: {ReportListGuard}},
  {path: "nuevo", component: ReportCreateComponent, canActivate: [UserLoggedGuard], resolve: {ReportCreateGuard}},
  {path: ":id", component: ReportViewComponent, canActivate: [UserLoggedGuard], resolve: {ReportViewGuard}},
  {path: "", component: ReportMainComponent, canActivate: [UserLoggedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRouting { }
