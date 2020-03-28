import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserViewComponent} from './components/view/user.view.component';
import {UserViewGuard} from './guards/user.view.guard';
import {EpsilonModule} from '../../epsilon.module';
import {UserEditComponent} from './components/edit/user.edit.component';
import {UserEditGuard} from './guards/user.edit.guard';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {PasswordStrengthBarModule} from 'ng2-password-strength-bar';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    UserViewComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FontAwesomeModule,
    FormsModule,
    NgSelectModule,
    CKEditorModule,
    PasswordStrengthBarModule,
    MomentModule,
    RouterModule
  ],
  providers: [
    UserViewGuard,
    UserEditGuard
  ]
})
export class UserModule { }
