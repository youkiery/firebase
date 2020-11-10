import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaizenPage } from './kaizen.page';

const routes: Routes = [
  {
    path: '',
    component: KaizenPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'notify',
    loadChildren: () => import('./notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizenPageRoutingModule {}
