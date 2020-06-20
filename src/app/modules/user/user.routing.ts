import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserEditComponent} from "./components/edit/user.edit.component";
import {UserEditGuard} from "./guards/user.edit.guard";

const routes: Routes = [
  {path: 'cuenta', component: UserEditComponent, resolve: {UserEditGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting { }
