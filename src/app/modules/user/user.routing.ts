import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserViewComponent} from "./components/view/user.view.component";
import {UserViewGuard} from "./guards/user.view.guard";

const routes: Routes = [
  {path: ":username", component: UserViewComponent, resolve: {UserViewGuard: UserViewGuard}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting { }
