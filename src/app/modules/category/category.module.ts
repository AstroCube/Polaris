import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {CategoryCreateComponent} from "./components/create/category.create.component";
import {CategoryEditComponent} from "./components/edit/category.edit.component";
import {CategoryListComponent} from "./components/list/category.list.component";
import {CategoryCreateGuard} from "./guards/category.create.guard";
import {CategoryEditGuard} from "./guards/category.edit.guard";
import {CategoryListGuard} from "./guards/category.list.guard";

@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    MomentModule,
    RouterModule
  ],
  providers: [
    CategoryCreateGuard,
    CategoryEditGuard,
    CategoryListGuard
  ]
})
export class CategoryModule { }
