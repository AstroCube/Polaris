import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule,
    MomentModule,
    RouterModule
  ],
  providers: [
  ]
})
export class PunishmentModule { }
