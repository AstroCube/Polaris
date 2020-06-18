import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PunishmentEditComponent} from "./components/edit/punishment.edit.component";
import {PunishmentEditGuard} from "./guards/punishment.edit.guard";
import {PunishmentViewGuard} from "./guards/punishment.view.guard";
import {PunishmentCreateComponent} from "./components/create/punishment.create.component";
import {UserLoggedGuard} from "../user/guards/user.logged.guard";
import {PunishmentCreateGuard} from "./guards/punishment.create.guard";
import {PunishmentViewComponent} from "./components/view/punishment.view.component";
import {UserPermissionsGuard} from "../user/guards/user.permissions.guard";
import {PunishmentListComponent} from "./components/list/punishment.list.component";
import {PunishmentListGuard} from "./guards/punishment.list.guard";

const routes: Routes = [
  {path: "editar/:id", component: PunishmentEditComponent, canActivate: [PunishmentEditGuard], resolve: {PunishmentViewGuard}},
  {path: "crear", component: PunishmentCreateComponent, canActivate: [UserLoggedGuard, PunishmentCreateGuard], resolve: {PunishmentCreateGuard}},
  {path: "ver/:id", component: PunishmentViewComponent, resolve: {PunishmentViewGuard, UserPermissionsGuard}},
  {path: ":page", component: PunishmentListComponent, resolve: {PunishmentListGuard}},
  {path: "", component: PunishmentListComponent, resolve: {PunishmentListGuard}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PunishmentRouting { }
