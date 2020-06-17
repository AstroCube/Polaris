import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxSpinnerModule} from "ngx-spinner";
import {ShopCategoryComponent} from "./components/category/shop.category.component";
import {ShopCartComponent} from "./components/cart/shop.cart.component";
import {ShopMainComponent} from "./components/main/shop.main.component";
import {ShopTransactionComponent} from "./components/transaction/shop.transaction.component";

@NgModule({
  declarations: [
    ShopCategoryComponent,
    ShopCartComponent,
    ShopMainComponent,
    ShopTransactionComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    MomentModule,
    RouterModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
  providers: [
  ],
  exports: []
})
export class ShopModule { }
