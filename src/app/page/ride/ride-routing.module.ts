import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidePage } from './ride.page';

const routes: Routes = [
  {
    path: '',
    component: RidePage
  },
  {
    path: 'col',
    loadChildren: () => import('./col/col.module').then( m => m.ColPageModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidePageRoutingModule {}
