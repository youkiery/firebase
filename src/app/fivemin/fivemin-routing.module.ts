import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiveminPage } from './fivemin.page';

const routes: Routes = [
  {
    path: '',
    component: FiveminPage
  },
  {
    path: 'undone',
    loadChildren: () => import('./undone/undone.module').then( m => m.UndonePageModule)
  },
  {
    path: 'done',
    loadChildren: () => import('./done/done.module').then( m => m.DonePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiveminPageRoutingModule {}
