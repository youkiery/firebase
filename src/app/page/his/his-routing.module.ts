import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisPage } from './his.page';

const routes: Routes = [
  {
    path: '',
    component: HisPage
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
export class HisPageRoutingModule {}
