import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TargetPage } from './target.page';

const routes: Routes = [
  {
    path: '',
    component: TargetPage
  },
  {
    path: 'stat',
    loadChildren: () => import('./stat/stat.module').then( m => m.StatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TargetPageRoutingModule {}
