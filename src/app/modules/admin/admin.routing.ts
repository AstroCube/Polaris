import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'categorias', loadChildren: () => import('./modules/category/admin.category.module').then(m => m.AdminCategoryModule)},
  {path: 'foros', loadChildren: () => import('./modules/forum/admin.forum.module').then(m => m.AdminForumModule)},
  {path: 'grupos', loadChildren: () => import('./modules/group/admin.group.module').then(m => m.AdminGroupModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }

