import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapViewComponent} from "./components/view/map.view.component";
import {MapMainComponent} from "./components/main/map.main.component";
import {MapViewGuard} from "./guards/map.view.guard";
import {MapMainGuard} from "./guards/map.main.guard";

const routes: Routes = [
  {path: ":id", component: MapViewComponent, resolve: {MapViewGuard}},
  {path: "", component: MapMainComponent, resolve: {MapMainGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRouting { }
