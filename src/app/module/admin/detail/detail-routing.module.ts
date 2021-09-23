import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDetail } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDetail
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDetailRoutingModule {}
