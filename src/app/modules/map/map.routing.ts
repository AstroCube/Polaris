import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapMainGuard} from "./guards/map.main.guard";
import {MapMainComponent} from "./components/main/map.main.component";
import {MapViewComponent} from "./components/view/map.view.component";
import {MapViewGuard} from "./guards/map.view.guard";

const routes: Routes = [
  {path: ":id", component: MapViewComponent, resolve: {MapViewGuard}},
  {path: "", component: MapMainComponent, resolve: {MapMainGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRouting { }
