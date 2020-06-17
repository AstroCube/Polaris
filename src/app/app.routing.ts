import {ModuleWithProviders } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationHomepageComponent} from './modules/application/components/homepage/application.homepage.component';
import {ApplicationLoginComponent} from './modules/application/components/login/application.login.component';
import {ForumMainComponent} from './modules/forum/components/main/forum.main.component';
import {ForumViewComponent} from './modules/forum/components/view/forum.view.component';
import {TopicViewComponent} from './modules/topic/components/view/topic.view.component';
import {CategoryListComponent} from './modules/category/components/list/category.list.component';
import {CategoryCreateComponent} from './modules/category/components/create/category.create.component';
import {CategoryEditComponent} from './modules/category/components/edit/category.edit.component';
import {ForumListComponent} from './modules/forum/components/list/forum.list.component';
import {ForumCreateComponent} from './modules/forum/components/create/forum.create.component';
import {ForumEditComponent} from './modules/forum/components/edit/forum.edit.component';
import {MapMainComponent} from './modules/map/components/main/map.main.component';
import {MapViewComponent} from './modules/map/components/view/map.view.component';
import {FriendshipMainComponent} from './modules/friendship/components/main/friendship.main.component';
import {AppealMainComponent} from './modules/appeal/components/main/appeal.main.component';
import {AppealViewComponent} from './modules/appeal/components/view/appeal.view.component';
import {ReportMainComponent} from './modules/report/components/main/report.main.component';
import {ReportListComponent} from './modules/report/components/list/report.list.component';
import {ReportCreateComponent} from './modules/report/components/create/report.create.component';
import {ReportViewComponent} from './modules/report/components/view/report.view.component';
import {ApplicationPrivacyComponent} from './modules/application/components/privacy/application.privacy.component';
import {ApplicationRulesComponent} from './modules/application/components/rules/application.rules.component';
import {ApplicationRefundComponent} from './modules/application/components/refund/application.refund.component';
import {ApplicationTermsComponent} from './modules/application/components/terms/application.terms.component';
import {ApplicationDevelopementComponent} from './modules/application/components/developement/application.developement.component';
import {UserViewGuard} from './modules/user/guards/user.view.guard';
import {CategoryListGuard} from './modules/category/guards/category.list.guard';
import {CategoryEditGuard} from './modules/category/guards/category.edit.guard';
import {CategoryCreateGuard} from './modules/category/guards/category.create.guard';
import {ForumCreateGuard} from './modules/forum/guards/forum.create.guard';
import {ForumListGuard} from './modules/forum/guards/forum.list.guard';
import {ForumEditGuard} from './modules/forum/guards/forum.edit.guard';
import {ApplicationErrorComponent} from './modules/application/components/error/application.error.component';
import {ApplicationAlertComponent} from './modules/application/components/alert/application.alert.component';
import {TopicCreateComponent} from './modules/topic/components/create/topic.create.component';
import {TopicCreateGuard} from './modules/topic/guards/topic.create.guard';
import {TopicViewGuard} from './modules/topic/guards/topic.view.guard';
import {TopicReplyComponent} from './modules/topic/components/reply/topic.reply.component';
import {TopicReplyGuard} from './modules/topic/guards/topic.reply.guard';
import {TopicEditGuard} from './modules/topic/guards/topic.edit.guard';
import {TopicEditComponent} from './modules/topic/components/edit/topic.edit.component';
import {ForumViewGuard} from './modules/forum/guards/forum.view.guard';
import {ForumMainGuard} from './modules/forum/guards/forum.main.guard';
import {PunishmentCreateGuard} from './modules/punishment/guards/punishment.create.guard';
import {PunishmentViewGuard} from './modules/punishment/guards/punishment.view.guard';
import {PunishmentEditGuard} from './modules/punishment/guards/punishment.edit.guard';
import {PunishmentListGuard} from './modules/punishment/guards/punishment.list.guard';
import {AppealListGuard} from './modules/appeal/guards/appeal.list.guard';
import {AppealViewGuard} from './modules/appeal/guards/appeal.view.guard';
import {AppealGlobalComponent} from './modules/appeal/components/global/appeal.global.component';
import {AppealGlobalGuard} from './modules/appeal/guards/appeal.global.guard';
import {AppealMainGuard} from './modules/appeal/guards/appeal.main.guard';
import {ReportCreateGuard} from './modules/report/guards/report.create.guard';
import {ReportViewGuard} from './modules/report/guards/report.view.guard';
import {ReportListGuard} from './modules/report/guards/report.list.guard';
import {MapViewGuard} from './modules/map/guards/map.view.guard';
import {MapMainGuard} from './modules/map/guards/map.main.guard';
import {MatchViewComponent} from './modules/match/components/view/match.view.component';
import {ApplicationDonationComponent} from './modules/application/components/donation/application.donation.component';
import {ApplicationDevelopementGuard} from './modules/application/guards/application.developement.guard';
import {MatchViewGuard} from './modules/match/guards/match.view.guard';
import {ApplicationHomepageGuard} from './modules/application/guards/application.homepage.guard';
import {GroupStaffComponent} from './modules/group/components/staff/group.staff.component';
import {GroupStaffGuard} from './modules/group/guards/group.staff.guard';
import {GroupListComponent} from './modules/group/components/list/group.list.component';
import {GroupListGuard} from './modules/group/guards/group.list.guard';
import {UserViewComponent} from './modules/user/components/view/user.view.component';
import {UserEditComponent} from './modules/user/components/edit/user.edit.component';
import {UserEditGuard} from './modules/user/guards/user.edit.guard';
import {PunishmentEditComponent} from "./modules/punishment/components/edit/punishment.edit.component";
import {PunishmentCreateComponent} from "./modules/punishment/components/create/punishment.create.component";
import {PunishmentViewComponent} from "./modules/punishment/components/view/punishment.view.component";
import {PunishmentListComponent} from "./modules/punishment/components/list/punishment.list.component";
import {UserPermissionsGuard} from "./modules/user/guards/user.permissions.guard";
import {UserLoggedGuard} from "./modules/user/guards/user.logged.guard";
import {AppealListComponent} from "./modules/appeal/components/list/appeal.list.component";

const app_routes: Routes = [
  {path: "login", component: ApplicationLoginComponent},
  {path: "registrarse", component: ApplicationLoginComponent},
  {path: "admin",
    children: [
      {path: "", redirectTo: "/", pathMatch: "full"},
      {path: "grupos",
        children: [
          {path: "", component: GroupListComponent, canActivate: [GroupListGuard], resolve: {GroupListGuard}}
        ]
      },
      {path: "editar-usuario/:id", component: UserEditComponent, canActivate: [UserEditGuard], resolve: {UserEditGuard}},
      {path: "categorias",
        children: [
          {path: "", component: CategoryListComponent, canActivate: [CategoryListGuard], resolve: {CategoryListGuard}},
          {path: "editar/:id", component: CategoryEditComponent, canActivate: [CategoryEditGuard], resolve: {CategoryEditGuard}},
          {path: "crear", component: CategoryCreateComponent, canActivate: [CategoryCreateGuard]}
        ]
      },
      {path: "foros",
        children: [
          {path: "", component: ForumListComponent, canActivate: [ForumListGuard], resolve: {ForumListGuard}},
          {path: "editar/:id", component: ForumEditComponent, canActivate: [ForumEditGuard], resolve: {ForumEditGuard}},
          {path: "crear", component: ForumCreateComponent, canActivate: [ForumCreateGuard], resolve: {ForumCreateGuard}}
        ]
      }
    ]
  },
  {path: "foro",
    children: [
      {path: "tema",
        children: [
          {path: "editar/:id", component: TopicEditComponent, canActivate: [TopicEditGuard], resolve: {TopicEditGuard}},
          {path: "responder/:id", component: TopicReplyComponent, canActivate: [TopicReplyGuard], resolve: {TopicReplyGuard}},
          {path: "crear", component: TopicCreateComponent, canActivate: [TopicCreateGuard], resolve: {TopicCreateGuard}},
          {path: ":id/:page", component: TopicViewComponent, canActivate: [TopicViewGuard], resolve: {TopicViewGuard}},
          {path: ":id", component: TopicViewComponent, canActivate: [TopicViewGuard], resolve: {TopicViewGuard}},
          {path: "", redirectTo: "/error?type=404", pathMatch: "full"}
        ]
      },
      {path: ":id", component: ForumViewComponent, canActivate: [ForumViewGuard], resolve: {ForumViewGuard}},
      {path: "", component: ForumMainComponent, resolve: {ForumMainGuard}}
    ]
  },
  {path: "sancion",
    children:[
      {path: "editar/:id", component: PunishmentEditComponent, canActivate: [PunishmentEditGuard], resolve: {PunishmentViewGuard}},
      {path: "crear", component: PunishmentCreateComponent, canActivate: [UserLoggedGuard, PunishmentCreateGuard], resolve: {PunishmentCreateGuard}},
      {path: ":id", component: PunishmentViewComponent, resolve: {PunishmentViewGuard, UserPermissionsGuard}},
      {path: "", redirectTo: "/sanciones", pathMatch: "full"}
    ]
  },
  {path: "apelar",
    children: [
      {path: "ver", component: AppealListComponent, canActivate: [UserLoggedGuard], resolve: {AppealListGuard}},
      {path: ":id", component: AppealViewComponent, canActivate: [UserLoggedGuard], resolve: {AppealViewGuard}},
      {path: "", component: AppealMainComponent, canActivate: [UserLoggedGuard], resolve: {AppealMainGuard}}
    ]
  },
  {path: "apelaciones/:page/:type", component: AppealGlobalComponent, canActivate: [AppealGlobalGuard], resolve: {AppealGlobalGuard}},
  {path: "apelaciones/:page", component: AppealGlobalComponent, canActivate: [AppealGlobalGuard], resolve: {AppealGlobalGuard}},
  {path: "apelaciones", component: AppealGlobalComponent, canActivate: [UserLoggedGuard], resolve: {AppealGlobalGuard}},
  {path: "reportar",
    children: [
      {path: "nuevo", component: ReportCreateComponent, canActivate: [UserLoggedGuard], resolve: {ReportCreateGuard}},
      {path: ":id", component: ReportViewComponent, canActivate: [UserLoggedGuard], resolve: {ReportViewGuard}},
      {path: "", component: ReportMainComponent, canActivate: [UserLoggedGuard]}
    ]
  },
  {path: "reportes", component: ReportListComponent, canActivate: [UserLoggedGuard], resolve: {ReportListGuard}},
  {path: "sanciones/:page", component: PunishmentListComponent, resolve: {PunishmentListGuard}},
  {path: "sanciones", component: PunishmentListComponent, resolve: {PunishmentListGuard}},
  {path: "cuenta", component: UserEditComponent, canActivate: [UserLoggedGuard], resolve: {UserEditGuard}},
  {path: "mapas",
    children: [
      {path: ":id", component: MapViewComponent, resolve: {MapViewGuard}},
      {path: "", component: MapMainComponent, resolve: {MapMainGuard}}
    ]
  },

  {path: "staff", component: GroupStaffComponent, resolve: {GroupStaffGuard}},
  {path: "desarrollo", component: ApplicationDevelopementComponent, resolve: {ApplicationDevelopementGuard}},
  {path: "partida/:id", component: MatchViewComponent, resolve: {MatchViewGuard}},
  {path: "alertas", component: ApplicationAlertComponent},
  {path: "amigos", component: FriendshipMainComponent},

  // --- Application static content related component --- //
  {path: "donaciones", component: ApplicationDonationComponent},
  {path: "privacidad", component: ApplicationPrivacyComponent},
  {path: "reglas", component: ApplicationRulesComponent},
  {path: "reembolsos", component: ApplicationRefundComponent},
  {path: "terminos", component: ApplicationTermsComponent},
  {path: "error", component: ApplicationErrorComponent},

  {path: ":username", component: UserViewComponent, resolve: {UserViewGuard: UserViewGuard}},
  {path: "", component: ApplicationHomepageComponent, resolve: {ApplicationHomepageGuard}}
  /* {path: "tienda/carrito", component: ShopCartComponent}, //TODO: Shop Creation
  {path: "tienda/categoria", component: ShopCategoryComponent},
  {path: "tienda", component: ShopMainComponent},
  {path: "transacciones", component: ShopTransactionComponent},*/
];

export const app_routing_providers: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
