import { NgModule } from '@angular/core';
import {MatchViewComponent} from "./components/view/match.view.component";
import {MatchViewGuard} from "./guards/match.view.guard";
import {RouterModule} from "@angular/router";
import {MomentModule} from "ngx-moment";
import {MatchRouting} from "./match.routing";

@NgModule({
  declarations: [
    MatchViewComponent
  ],
  imports: [
    RouterModule,
    MatchRouting,
    MomentModule
  ],
  providers: [
    MatchViewGuard
  ]
})
export class MatchModule { }
