import { NgModule } from '@angular/core';
import {UserViewComponent} from './components/view/user.view.component';
import {UserViewGuard} from './guards/user.view.guard';
import {UserEditComponent} from './components/edit/user.edit.component';
import {UserEditGuard} from './guards/user.edit.guard';
import {UserRouting} from "./user.routing";
import {FormsModule} from "@angular/forms";
import {EpsilonModule} from "../../epsilon.module";
import {MomentModule} from "ngx-moment";
import {CommonModule} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {Ng9PasswordStrengthBarModule} from "ng9-password-strength-bar";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    UserViewComponent,
    UserEditComponent
  ],
  imports: [
    UserRouting,
    FormsModule,
    EpsilonModule,
    MomentModule,
    CommonModule,
    NgSelectModule,
    Ng9PasswordStrengthBarModule,
    CKEditorModule
  ],
  providers: [
    UserViewGuard,
    UserEditGuard
  ],
  exports: []
})
export class UserModule { }
