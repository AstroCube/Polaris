import {ModuleWithProviders } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const app_routes: Routes = [
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: 'amigos', loadChildren: () => import('./modules/friendship/friendship.module').then(m => m.FriendshipModule)},
  {path: 'apelar', loadChildren: () => import('./modules/appeal/appeal.module').then(m => m.AppealModule)},
  {path: 'foro', loadChildren: () => import('./modules/forum/forum.module').then(m => m.ForumModule)},
  {path: 'amistades', loadChildren: () => import('./modules/friendship/friendship.module').then(m => m.FriendshipModule)},
  {path: 'mapas', loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule)},
  {path: 'partidas', loadChildren: () => import('./modules/match/match.module').then(m => m.MatchModule)},
  {path: 'sanciones', loadChildren: () => import('./modules/punishment/punishment.module').then(m => m.PunishmentModule)},
  {path: 'reportar', loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)},
  {path: '', loadChildren: () => import('./modules/group/group.module').then(m => m.GroupModule)},
  {path: '', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path: '', loadChildren: () => import('./modules/application/application.module').then(m => m.ApplicationModule)}
];

export const app_routing_providers: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
