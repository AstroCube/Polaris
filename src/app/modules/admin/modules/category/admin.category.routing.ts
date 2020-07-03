import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryListComponent} from "./components/list/category.list.component";
import {CategoryEditComponent} from "./components/edit/category.edit.component";
import {CategoryCreateComponent} from "./components/create/category.create.component";
import {CategoryListGuard} from "./guards/category.list.guard";
import {CategoryEditGuard} from "./guards/category.edit.guard";
import {CategoryPermissionsGuard} from "./guards/category.permissions.guard";

const routes: Routes = [
  {path: "", component: CategoryListComponent, canActivate: [CategoryPermissionsGuard], resolve: {CategoryListGuard}},
  {path: "editar/:id", component: CategoryEditComponent, canActivate: [CategoryPermissionsGuard], resolve: {CategoryEditGuard}},
  {path: "crear", component: CategoryCreateComponent, canActivate: [CategoryPermissionsGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCategoryRouting { }
