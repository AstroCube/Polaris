import {ModuleWithProviders } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationHomepageComponent} from './components/application/homepage/application.homepage.component';
import {ApplicationLoginComponent} from './components/application/login/application.login.component';
import {UserEditComponent} from './components/user/edit/user.edit.component';
import {UserViewComponent} from './components/user/view/user.view.component';
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
import {PunishmentListComponent} from './components/punishment/list/punishment.list.component';
import {PunishmentCreateComponent} from './components/punishment/create/punishment.create.component';
import {PunishmentViewComponent} from './components/punishment/view/punishment.view.component';
import {PunishmentEditComponent} from './components/punishment/edit/punishment.edit.component';
import {AppealMainComponent} from './components/appeal/main/appeal.main.component';
import {AppealViewComponent} from './components/appeal/view/appeal.view.component';
import {AppealListComponent} from './components/appeal/list/appeal.list.component';
import {ReportMainComponent} from './components/report/main/report.main.component';
import {ReportListComponent} from './components/report/list/report.list.component';
import {ReportCreateComponent} from './components/report/create/report.create.component';
import {ReportViewComponent} from './components/report/view/report.view.component';
import {ShopTransactionComponent} from './components/shop/transaction/shop.transaction.component';
import {ApplicationPrivacyComponent} from './components/application/privacy/application.privacy.component';
import {ApplicationRulesComponent} from './components/application/rules/application.rules.component';
import {ApplicationRefundComponent} from './components/application/refund/application.refund.component';
import {ApplicationTermsComponent} from './components/application/terms/application.terms.component';
import {ApplicationDevelopementComponent} from './components/application/developement/application.developement.component';
import {ApplicationLoginGuard} from './guards/application/application.login.guard';
import {UserEditGuard} from './guards/user/user.edit.guard';
import {UserViewGuard} from './guards/user/user.view.guard';
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
import {PunishmentCreateGuard} from './guards/punishment/punishment.create.guard';
import {PunishmentViewGuard} from './guards/punishment/punishment.view.guard';
import {PunishmentEditGuard} from './guards/punishment/punishment.edit.guard';
import {PunishmentListGuard} from './guards/punishment/punishment.list.guard';

const app_routes: Routes = [
  {path: "login", component: ApplicationLoginComponent, canActivate: [ApplicationLoginGuard]},
  {path: "registrarse", component: ApplicationLoginComponent, canActivate: [ApplicationLoginGuard]},
  {path: "admin",
    children: [
      {path: "", redirectTo: "/", pathMatch: "full"},
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
      {path: "editar/:id", component: PunishmentEditComponent, canActivate: [PunishmentEditGuard], resolve: {PunishmentEditGuard}},
      {path: "crear", component: PunishmentCreateComponent, canActivate: [PunishmentCreateGuard], resolve: {PunishmentCreateGuard}},
      {path: ":id", component: PunishmentViewComponent, resolve: {PunishmentViewGuard}},
      {path: "", redirectTo: "/sanciones", pathMatch: "full"}
    ]
  },
  {path: "sanciones/:page", component: PunishmentListComponent, resolve: {PunishmentListGuard}},
  {path: "sanciones", component: PunishmentListComponent, resolve: {PunishmentListGuard}},
  {path: "cuenta", component: UserEditComponent, canActivate: [UserEditGuard], resolve: {UserEditGuard}},
  {path: "alertas", component: ApplicationAlertComponent},
  {path: "apelar", component: AppealMainComponent},
  {path: "apelar/list", component: AppealListComponent},
  {path: "apelar/view", component: AppealViewComponent},
  {path: "amigos", component: FriendshipComponent},
  {path: "desarrollo", component: ApplicationDevelopementComponent},
  {path: "mapa/view", component: MapViewComponent},
  {path: "mapas", component: MapMainComponent},
  {path: "foroint", component: ForumViewComponent},
  {path: "privacidad", component: ApplicationPrivacyComponent},
  {path: "reglas", component: ApplicationRulesComponent},
  {path: "reembolsos", component: ApplicationRefundComponent},
  {path: "reportar", component: ReportMainComponent},
  {path: "reportar/create", component: ReportCreateComponent},
  {path: "reportar/list", component: ReportListComponent},
  {path: "reportar/view", component: ReportViewComponent},
  {path: "terminos", component: ApplicationTermsComponent},
  {path: "tienda/carrito", component: ShopCartComponent},
  {path: "tienda/categoria", component: ShopCategoryComponent},
  {path: "tienda", component: ShopMainComponent},
  {path: "transacciones", component: ShopTransactionComponent},
  {path: "topic", component: TopicViewComponent},
  {path: "error", component: ApplicationErrorComponent},
  {path: ":username", component: UserViewComponent, resolve: {UserViewGuard: UserViewGuard}},
  {path: "", component: ApplicationHomepageComponent}
];

export const app_routing_providers: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
