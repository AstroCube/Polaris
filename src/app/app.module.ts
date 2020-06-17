import { BrowserModule } from '@angular/platform-browser';
import {ApplicationModule, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {app_routing_providers, routing} from './app.routing';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {NotifierModule} from 'angular-notifier';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {UserViewGuard} from './modules/user/guards/user.view.guard';
import {CategoryService} from './services/category.service';
import {ForumService} from './services/forum.service';
import {TopicService} from './services/topic.service';
import {PunishmentService} from './services/punishment.service';
import {AppealService} from './services/appeal.service';
import {MapService} from './services/map.service';
import {GithubService} from './services/github.service';
import {MatchService} from './services/match.service';
import {GroupService} from './services/group.service';
import {FriendService} from './services/friend.service';
import {UserModule} from './modules/user/user.module';
import {EpsilonModule} from './epsilon.module';
import {UserPermissionsGuard} from "./modules/user/guards/user.permissions.guard";
import {UserLoggedGuard} from "./modules/user/guards/user.logged.guard";
import {ReportModule} from "./modules/report/report.module";
import {PunishmentModule} from "./modules/punishment/punishment.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {SocketIoModule} from "ngx-socket-io";
import {MomentModule} from "ngx-moment";
import {Ng9PasswordStrengthBarModule} from "ng9-password-strength-bar";
import {AppealModule} from "./modules/appeal/appeal.module";
import {CategoryModule} from "./modules/category/category.module";
import {ForumModule} from "./modules/forum/forum.module";
import {FriendshipModule} from "./modules/friendship/friendship.module";
import {GroupModule} from "./modules/group/group.module";
import {MapModule} from "./modules/map/map.module";
import {MatchModule} from "./modules/match/match.module";
import {TopicModule} from "./modules/topic/topic.module";
import {ShopModule} from "./modules/shop/shop.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppealModule,
    ApplicationModule,
    CategoryModule,
    ForumModule,
    FriendshipModule,
    GroupModule,
    MapModule,
    MatchModule,
    PunishmentModule,
    ReportModule,
    ShopModule,
    TopicModule,
    UserModule,

    BrowserModule,
    CKEditorModule,
    EpsilonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng9PasswordStrengthBarModule,
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
    routing,
    AppealModule
  ],
  providers: [
    app_routing_providers,
    AppealService,
    CategoryService,
    ForumService,
    FriendService,
    GithubService,
    GroupService,
    MapService,
    MatchService,
    UserPermissionsGuard,
    UserLoggedGuard,
    PunishmentService,
    TopicService,
    UserViewGuard,
    UserService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
