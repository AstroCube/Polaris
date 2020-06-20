import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLoggedGuard} from "../user/guards/user.logged.guard";
import {AppealListComponent} from "./components/list/appeal.list.component";
import {AppealViewComponent} from "./components/view/appeal.view.component";
import {AppealListGuard} from "./guards/appeal.list.guard";
import {AppealViewGuard} from "./guards/appeal.view.guard";
import {AppealMainGuard} from "./guards/appeal.main.guard";
import {AppealMainComponent} from "./components/main/appeal.main.component";
import {AppealGlobalComponent} from "./components/global/appeal.global.component";
import {AppealGlobalGuard} from "./guards/appeal.global.guard";

const routes: Routes = [
  {path: "dashboard", component: AppealListComponent, canActivate: [UserLoggedGuard], resolve: {AppealListGuard}},
  {path: "lista", component: AppealGlobalComponent, canActivate: [UserLoggedGuard], resolve: {AppealGlobalGuard}},
  {path: "lista/:page", component: AppealGlobalComponent, canActivate: [AppealGlobalGuard], resolve: {AppealGlobalGuard}},
  {path: ":id", component: AppealViewComponent, canActivate: [UserLoggedGuard], resolve: {AppealViewGuard}},
  {path: "", component: AppealMainComponent, canActivate: [UserLoggedGuard], resolve: {AppealMainGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppealRouting { }
