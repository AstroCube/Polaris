import {ModuleWithProviders } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationHomepageComponent} from './components/application/homepage/application.homepage.component';
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
import {FriendshipComponent} from './components/friendship/friendship.component';
import {AppealMainComponent} from './modules/appeal/components/main/appeal.main.component';
import {AppealViewComponent} from './modules/appeal/components/view/appeal.view.component';
import {ReportMainComponent} from './modules/report/components/main/report.main.component';
import {ReportListComponent} from './modules/report/components/list/report.list.component';
import {ReportCreateComponent} from './modules/report/components/create/report.create.component';
import {ReportViewComponent} from './modules/report/components/view/report.view.component';
import {ApplicationPrivacyComponent} from './components/application/privacy/application.privacy.component';
import {ApplicationRulesComponent} from './components/application/rules/application.rules.component';
import {ApplicationRefundComponent} from './components/application/refund/application.refund.component';
import {ApplicationTermsComponent} from './components/application/terms/application.terms.component';
import {ApplicationDevelopementComponent} from './components/application/developement/application.developement.component';
import {UserViewGuard} from './modules/user/guards/user.view.guard';
import {CategoryListGuard} from './guards/category/category.list.guard';
import {CategoryEditGuard} from './guards/category/category.edit.guard';
import {CategoryCreateGuard} from './guards/category/category.create.guard';
import {ForumCreateGuard} from './guards/forum/forum.create.guard';
import {ForumListGuard} from './guards/forum/forum.list.guard';
import {ForumEditGuard} from './guards/forum/forum.edit.guard';
import {ApplicationErrorComponent} from './components/application/error/application.error.component';
import {ApplicationAlertComponent} from './components/application/alert/application.alert.component';
import {TopicCreateComponent} from './components/topic/create/topic.create.component';
import {TopicCreateGuard} from './guards/topic/topic.create.guard';
import {TopicViewGuard} from './guards/topic/topic.view.guard';
import {TopicReplyComponent} from './components/topic/reply/topic.reply.component';
import {TopicReplyGuard} from './guards/topic/topic.reply.guard';
import {TopicEditGuard} from './guards/topic/topic.edit.guard';
import {TopicEditComponent} from './components/topic/edit/topic.edit.component';
import {ForumViewGuard} from './guards/forum/forum.view.guard';
import {ForumMainGuard} from './guards/forum/forum.main.guard';
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
import {MapViewGuard} from './guards/map/map.view.guard';
import {MapMainGuard} from './guards/map/map.main.guard';
import {MatchViewComponent} from './components/match/view/match.view.component';
import {ApplicationDonationComponent} from './components/application/donation/application.donation.component';
import {ApplicationDevelopementGuard} from './guards/application/application.developement.guard';
import {MatchViewGuard} from './guards/match/match.view.guard';
import {ApplicationHomepageGuard} from './guards/application/application.homepage.guard';
import {GroupStaffComponent} from './components/group/staff/group.staff.component';
import {GroupStaffGuard} from './guards/group/group.staff.guard';
import {GroupListComponent} from './components/group/list/group.list.component';
import {GroupListGuard} from './guards/group/group.list.guard';
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
  {path: "amigos", component: FriendshipComponent},

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
