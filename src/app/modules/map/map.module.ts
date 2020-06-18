import { NgModule } from '@angular/core';
import {MapMainComponent} from "./components/main/map.main.component";
import {MapViewComponent} from "./components/view/map.view.component";
import {MapViewGuard} from "./guards/map.view.guard";
import {MapMainGuard} from "./guards/map.main.guard";
import {MapRouting} from "./map.routing";
import {EpsilonModule} from "../../epsilon.module";

@NgModule({
  declarations: [
    MapMainComponent,
    MapViewComponent
  ],
    imports: [
        MapRouting,
        EpsilonModule
    ],
  providers: [
    MapViewGuard,
    MapMainGuard
  ]
})
export class MapModule { }
