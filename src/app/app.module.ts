import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {app_routing_providers, routing} from './app.routing';
import {ApplicationHeaderComponent} from './components/application/header/application.header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ApplicationHomepageComponent} from './components/application/homepage/application.homepage.component';
import {ApplicationFooterComponent} from './components/application/footer/application.footer.component';
import {ApplicationLoginComponent} from './components/application/login/application.login.component';
import {ForumMainComponent} from './components/forum/main/forum.main.component';
import {ForumViewComponent} from './components/forum/view/forum.view.component';
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
import {PasswordStrengthBarModule} from 'ng2-password-strength-bar';
import {NgSelectModule} from '@ng-select/ng-select';
import {NotifierModule} from 'angular-notifier';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {UserViewGuard} from './modules/user/guards/user.view.guard';
import {MomentModule} from 'ngx-moment';
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
import { MyDatePickerModule } from 'mydatepicker';
import {AppealService} from './services/appeal.service';
import {MapService} from './services/map.service';
import {MapViewGuard} from './guards/map/map.view.guard';
import {MapMainGuard} from './guards/map/map.main.guard';
import {MatchViewComponent} from './components/match/view/match.view.component';
import {ApplicationDonationComponent} from './components/application/donation/application.donation.component';
import {ApplicationDevelopementGuard} from './guards/application/application.developement.guard';
import {GithubService} from './services/github.service';
import {MatchService} from './services/match.service';
import {MatchViewGuard} from './guards/match/match.view.guard';
import {ApplicationHomepageGuard} from './guards/application/application.homepage.guard';
import {GroupStaffComponent} from './components/group/staff/group.staff.component';
import {GroupService} from './services/group.service';
import {GroupStaffGuard} from './guards/group/group.staff.guard';
import {GroupListComponent} from './components/group/list/group.list.component';
import {GroupListGuard} from './guards/group/group.list.guard';
import {FriendService} from './services/friend.service';
import {UserModule} from './modules/user/user.module';
import {EpsilonModule} from './epsilon.module';
import {UserPermissionsGuard} from "./modules/user/guards/user.permissions.guard";
import {UserLoggedGuard} from "./modules/user/guards/user.logged.guard";
import {AppealModule} from "./modules/appeal/appeal.module";
import {ReportModule} from "./modules/report/report.module";
import {PunishmentModule} from "./modules/punishment/punishment.module";


@NgModule({
  declarations: [

    // --- Components --- //

    ApplicationAlertComponent,
    ApplicationDevelopementComponent,
    ApplicationDonationComponent,
    ApplicationErrorComponent,
    ApplicationFooterComponent,
    ApplicationHeaderComponent,
    ApplicationHomepageComponent,
    ApplicationLoginComponent,
    ApplicationPrivacyComponent,
    GroupListComponent,
    GroupStaffComponent,
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
    MatchViewComponent,
    ShopCategoryComponent,
    ShopCartComponent,
    ShopMainComponent,
    ShopTransactionComponent,
    TopicCreateComponent,
    TopicEditComponent,
    TopicReplyComponent,
    TopicViewComponent,
    AppComponent,

    // --- Directives --- //
  ],
  imports: [
    AppealModule,
    BrowserModule,
    CKEditorModule,
    EpsilonModule,
    UserModule,
    PunishmentModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    PasswordStrengthBarModule,
    MyDatePickerModule,
    ReportModule,
    MomentModule,
    SocketIoModule.forRoot({url: 'http://149.56.40.174:7533', options: {}}),
    NgSelectModule,
    NotifierModule.withConfig({
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
    ApplicationDevelopementGuard,
    ApplicationHomepageGuard,
    GroupListGuard,
    GroupStaffGuard,
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
    FriendService,
    GithubService,
    GroupService,
    MapViewGuard,
    MapMainGuard,
    MapService,
    MatchViewGuard,
    MatchService,
    UserPermissionsGuard,
    UserLoggedGuard,
    PunishmentService,
    TopicCreateGuard,
    TopicEditGuard,
    TopicReplyGuard,
    TopicViewGuard,
    TopicService,
    UserViewGuard,
    UserService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
