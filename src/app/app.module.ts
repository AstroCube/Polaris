import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {app_routing_providers, routing} from './app.routing';
import {ApplicationHeaderComponent} from './components/application/header/application.header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ApplicationHomepageComponent} from './components/application/homepage/application.homepage.component';
import {ApplicationFooterComponent} from './components/application/footer/application.footer.component';
import {ApplicationLoginComponent} from './components/application/login/application.login.component';
import {UserEditComponent} from './components/user/edit/user.edit.component';
import {UserViewComponent} from './components/user/view/user.view.component';
import {ForumMainComponent} from './components/forum/main/forum.main.component';
import {ForumViewComponent} from './components/forum/view/forum.view.component';
import {ApplicationPaginationComponent} from './components/application/pagination/application.pagination.component';
import {TopicViewComponent} from './components/topic/view/topic.view.component';
import {CategoryListComponent} from './components/category/list/category.list.component';
import {CategoryCreateComponent} from './components/category/create/category.create.component';
import {CategoryEditComponent} from './components/category/edit/category.edit.component';
import {ForumListComponent} from './components/forum/list/forum.list.component';
import {ForumCreateComponent} from './components/forum/create/forum.create.component';
import {ForumEditComponent} from './components/forum/edit/forum.edit.component';
import {MapMainComponent} from './components/map/main/map.main.component';
import {MapViewComponent} from './components/map/view/map.view.component';
import {ShopMainComponent} from './components/shop/main/shop.main.component';
import {ShopCategoryComponent} from './components/shop/category/shop.category.component';
import {ShopCartComponent} from './components/shop/cart/shop.cart.component';
import {FriendshipComponent} from './components/friendship/friendship.component';
import {PunishmentListComponent} from './components/punishment/list/punishment.list.component';
import {PunishmentCreateComponent} from './components/punishment/create/punishment.create.component';
import {PunishmentViewComponent} from './components/punishment/view/punishment.view.component';
import {AppealMainComponent} from './components/appeal/main/appeal.main.component';
import {PunishmentEditComponent} from './components/punishment/edit/punishment.edit.component';
import {AppealViewComponent} from './components/appeal/view/appeal.view.component';
import {AppealListComponent} from './components/appeal/list/appeal.list.component';
import {ReportMainComponent} from './components/report/main/report.main.component';
import {ReportListComponent} from './components/report/list/report.list.component';
import {ReportCreateComponent} from './components/report/create/report.create.component';
import {ReportViewComponent} from './components/report/view/report.view.component';
import {ShopTransactionComponent} from './components/shop/transaction/shop.transaction.component';
import {ApplicationPrivacyComponent} from './components/application/privacy/application.privacy.component';
import {ApplicationRefundComponent} from './components/application/refund/application.refund.component';
import {ApplicationRulesComponent} from './components/application/rules/application.rules.component';
import {ApplicationTermsComponent} from './components/application/terms/application.terms.component';
import {ApplicationDevelopementComponent} from './components/application/developement/application.developement.component';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApplicationLoginGuard} from './guards/application/application.login.guard';
import {UserEditGuard} from './guards/user/user.edit.guard';
import {PasswordStrengthBarModule} from 'ng2-password-strength-bar';
import {NgSelectModule} from '@ng-select/ng-select';
import {NotifierModule} from 'angular-notifier';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {UserViewGuard} from './guards/user/user.view.guard';
import {ValueOfPipe} from './pipes/ValueOf.pipe';
import {MomentModule} from 'ngx-moment';
import {NoSanitizePipe} from './pipes/NoSanitize.pipe';
import {CategoryService} from './services/category.service';
import {CategoryListGuard} from './guards/category/category.list.guard';
import {CategoryEditGuard} from './guards/category/category.edit.guard';
import {CategoryCreateGuard} from './guards/category/category.create.guard';
import {ForumService} from './services/forum.service';
import {ForumCreateGuard} from './guards/forum/forum.create.guard';
import {ForumListGuard} from './guards/forum/forum.list.guard';
import {ForumEditGuard} from './guards/forum/forum.edit.guard';
import {ApplicationErrorComponent} from './components/application/error/application.error.component';
import {ApplicationAlertComponent} from './components/application/alert/application.alert.component';
import {TopicCreateComponent} from './components/topic/create/topic.create.component';
import {TopicCreateGuard} from './guards/topic/topic.create.guard';
import {TopicService} from './services/topic.service';
import {TooltipDirective} from './directives/tooltip.directive';
import {CollapsibleDirective} from './directives/collapsible.directive';
import {ProfileDropdownDirective} from './directives/profile.dropdown.directive';
import {NavbarDropdownDirective} from './directives/navbar.dropdown.directive';
import {NavbarResponsiveDirective} from './directives/navbar.responsive.directive';
import {SliderDirective} from './directives/slider.directive';
import {TabDirective} from './directives/tab.directive';
import {ScrollbarDirective} from './directives/scrollbar.directive';
import {PopupDirective} from './directives/popup.directive';
import {TopicViewGuard} from './guards/topic/topic.view.guard';
import {TopicReplyComponent} from './components/topic/reply/topic.reply.component';
import {TopicReplyGuard} from './guards/topic/topic.reply.guard';
import {TopicEditComponent} from './components/topic/edit/topic.edit.component';
import {TopicEditGuard} from './guards/topic/topic.edit.guard';
import {ForumViewGuard} from './guards/forum/forum.view.guard';
import {ForumMainGuard} from './guards/forum/forum.main.guard';
import {SocketIoModule} from 'ngx-socket-io';
import {ForumFeedComponent} from './components/forum/feed/forum.feed.component';
import {PunishmentService} from './services/punishment.service';
import {PunishmentCreateGuard} from './guards/punishment/punishment.create.guard';
import { MyDatePickerModule } from 'mydatepicker';
import {PunishmentViewGuard} from './guards/punishment/punishment.view.guard';
import {PunishmentEditGuard} from './guards/punishment/punishment.edit.guard';
import {PunishmentListGuard} from './guards/punishment/punishment.list.guard';
import {AppealService} from './services/appeal.service';
import {AppealListGuard} from './guards/appeal/appeal.list.guard';
import {AppealViewGuard} from './guards/appeal/appeal.view.guard';
import {AppealGlobalComponent} from './components/appeal/global/appeal.global.component';
import {ClassifierDirective} from './directives/classifier.directive';
import {AppealGlobalGuard} from './guards/appeal/appeal.global.guard';
import {AppealMainGuard} from './guards/appeal/appeal.main.guard';
import {ReportService} from './services/report.service';
import {ReportMainGuard} from './guards/report/report.main.guard';
import {ReportCreateGuard} from './guards/report/report.create.guard';
import {ReportViewGuard} from './guards/report/report.view.guard';

@NgModule({
  declarations: [

    // --- Components --- //

    AppealGlobalComponent,
    AppealListComponent,
    AppealMainComponent,
    AppealViewComponent,
    ApplicationAlertComponent,
    ApplicationDevelopementComponent,
    ApplicationErrorComponent,
    ApplicationFooterComponent,
    ApplicationHeaderComponent,
    ApplicationHomepageComponent,
    ApplicationLoginComponent,
    ApplicationPaginationComponent,
    ApplicationPrivacyComponent,
    ApplicationRefundComponent,
    ApplicationRulesComponent,
    ApplicationTermsComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ForumCreateComponent,
    ForumEditComponent,
    ForumFeedComponent,
    ForumListComponent,
    ForumMainComponent,
    ForumViewComponent,
    FriendshipComponent,
    MapMainComponent,
    MapViewComponent,
    NoSanitizePipe,
    PunishmentCreateComponent,
    PunishmentEditComponent,
    PunishmentListComponent,
    PunishmentViewComponent,
    ReportCreateComponent,
    ReportListComponent,
    ReportMainComponent,
    ReportViewComponent,
    ShopCategoryComponent,
    ShopCartComponent,
    ShopMainComponent,
    ShopTransactionComponent,
    TopicCreateComponent,
    TopicEditComponent,
    TopicReplyComponent,
    TopicViewComponent,
    UserEditComponent,
    UserViewComponent,
    ValueOfPipe,
    AppComponent,

    // --- Directives --- //

    ClassifierDirective,
    CollapsibleDirective,
    NavbarDropdownDirective,
    NavbarResponsiveDirective,
    PopupDirective,
    ProfileDropdownDirective,
    ScrollbarDirective,
    SliderDirective,
    TabDirective,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    PasswordStrengthBarModule,
    MyDatePickerModule,
    MomentModule,
    SocketIoModule.forRoot({ url: 'http://localhost:7533', options: {} }),
    NgSelectModule,
    NotifierModule.withConfig( {
      position: {
        horizontal: {
          position: 'right'
        }
      }
    }),
    routing
  ],
  providers: [
    app_routing_providers,
    ApplicationLoginGuard,
    AppealGlobalGuard,
    AppealListGuard,
    AppealMainGuard,
    AppealViewGuard,
    AppealService,
    CategoryCreateGuard,
    CategoryEditGuard,
    CategoryListGuard,
    CategoryService,
    ForumCreateGuard,
    ForumEditGuard,
    ForumListGuard,
    ForumMainGuard,
    ForumViewGuard,
    ForumService,
    PunishmentCreateGuard,
    PunishmentEditGuard,
    PunishmentListGuard,
    PunishmentViewGuard,
    PunishmentService,
    ReportCreateGuard,
    ReportMainGuard,
    ReportViewGuard,
    ReportService,
    TopicCreateGuard,
    TopicEditGuard,
    TopicReplyGuard,
    TopicViewGuard,
    TopicService,
    UserEditGuard,
    UserViewGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
