import { NgModule } from '@angular/core';;
import {CategoryCreateComponent} from "./components/create/category.create.component";
import {CategoryEditComponent} from "./components/edit/category.edit.component";
import {CategoryListComponent} from "./components/list/category.list.component";
import {CategoryCreateGuard} from "./guards/category.create.guard";
import {CategoryEditGuard} from "./guards/category.edit.guard";
import {CategoryListGuard} from "./guards/category.list.guard";
import {AdminCategoryRouting} from "./admin.category.routing";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent
  ],
  imports: [
    AdminCategoryRouting,
    FormsModule
  ],
  providers: [
    CategoryCreateGuard,
    CategoryEditGuard,
    CategoryListGuard
  ]
})
export class AdminCategoryModule { }
