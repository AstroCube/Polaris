import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatchViewGuard} from "./guards/match.view.guard";
import {MatchViewComponent} from "./components/view/match.view.component";

const routes: Routes = [
  {path: "partida/:id", component: MatchViewComponent, resolve: {MatchViewGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRouting { }
