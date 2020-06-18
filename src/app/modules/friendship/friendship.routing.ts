import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FriendshipMainComponent} from "./components/main/friendship.main.component";

const routes: Routes = [
  {path: "", component: FriendshipMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendshipRouting { }
