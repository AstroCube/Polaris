import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserViewComponent} from './components/view/user.view.component';
import {UserViewGuard} from './guards/user.view.guard';
import {EpsilonModule} from '../../epsilon.module';
import {UserEditComponent} from './components/edit/user.edit.component';
import {UserEditGuard} from './guards/user.edit.guard';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {Ng9PasswordStrengthBarModule} from "ng9-password-strength-bar";

@NgModule({
  declarations: [
    UserViewComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    NgSelectModule,
    CKEditorModule,
    Ng9PasswordStrengthBarModule,
    MomentModule,
    RouterModule
  ],
  providers: [
    UserViewGuard,
    UserEditGuard
  ],
  exports: []
})
export class UserModule { }
