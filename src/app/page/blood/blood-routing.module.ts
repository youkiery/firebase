import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodPage } from './blood.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'in',
    loadChildren: () => import('./in/in.module').then( m => m.InPageModule)
  },
  {
    path: 'out',
    loadChildren: () => import('./out/out.module').then( m => m.OutPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodPageRoutingModule {}
