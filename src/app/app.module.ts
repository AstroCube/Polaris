import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {AppRouting} from './app.routing';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {NotifierModule} from 'angular-notifier';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {UserViewGuard} from './modules/user/guards/user.view.guard';
import {CategoryService} from './services/forum/category.service';
import {ForumService} from './services/forum/forum.service';
import {TopicService} from './services/forum/topic.service';
import {PunishmentService} from './services/moderation/punishment.service';
import {AppealService} from './services/moderation/appeal.service';
import {MapService} from './services/minecraft/map.service';
import {GithubService} from './services/github.service';
import {MatchService} from './services/minecraft/match.service';
import {GroupService} from './services/group.service';
import {FriendService} from './services/minecraft/friend.service';
import {EpsilonModule} from './epsilon.module';
import {UserPermissionsGuard} from "./modules/user/guards/user.permissions.guard";
import {UserLoggedGuard} from "./modules/user/guards/user.logged.guard";
import {NgxSpinnerModule} from "ngx-spinner";
import {SocketIoModule} from "ngx-socket-io";
import {MomentModule} from "ngx-moment";
import {Ng9PasswordStrengthBarModule} from "ng9-password-strength-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApplicationModule} from "./modules/application/application.module";
import {UserModule} from "./modules/user/user.module";
import {GamemodeService} from "./services/minecraft/gamemode.service";
import {ForumUtilities} from "./utilities/forum-utilities";
import {PostService} from "./services/forum/post.service";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        AppRouting,
        BrowserModule,
        BrowserAnimationsModule,
        CKEditorModule,
        EpsilonModule,
        NgxSpinnerModule,
        FormsModule,
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
        ApplicationModule
    ],
  providers: [
    AppealService,
    CategoryService,
    ForumService,
    FriendService,
    ForumUtilities,
    PostService,
    GithubService,
    GroupService,
    GamemodeService,
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
