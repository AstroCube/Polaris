import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {FriendshipMainComponent} from "./components/main/friendship.main.component";

@NgModule({
  declarations: [
    FriendshipMainComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    NgSelectModule,
    MomentModule,
    RouterModule,
    AngularMyDatePickerModule
  ],
  providers: [
  ]
})
export class FriendshipModule { }
