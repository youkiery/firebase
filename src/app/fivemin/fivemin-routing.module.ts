import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiveminPage } from './fivemin.page';

const routes: Routes = [
  {
    path: '',
    component: FiveminPage
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'preview',
    loadChildren: () => import('./preview/preview.module').then( m => m.PreviewPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then( m => m.StatisticPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiveminPageRoutingModule {}
