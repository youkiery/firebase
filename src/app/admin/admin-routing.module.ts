import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.AdminDetailModule)
  },
  {
    path: 'gopy',
    loadChildren: () => import('./gopy/gopy.module').then( m => m.GopyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
