import { NgModule } from '@angular/core';
import {FriendshipMainComponent} from "./components/main/friendship.main.component";
import {FriendshipRouting} from "./friendship.routing";
import {EpsilonModule} from "../../epsilon.module";

@NgModule({
  declarations: [
    FriendshipMainComponent
  ],
  imports: [
    FriendshipRouting,
    EpsilonModule
  ],
  providers: [
  ]
})
export class FriendshipModule { }
