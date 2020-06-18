import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'tema', loadChildren: () => import('./modules/topic/topic.base.module').then(m => m.TopicBaseModule)},
  {path: '', loadChildren: () => import('./modules/base/forum.base.module').then(m => m.ForumBaseModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRouting { }
