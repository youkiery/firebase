import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodPage } from './blood.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodPageRoutingModule {}
