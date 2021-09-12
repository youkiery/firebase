import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsgPage } from './usg.page';

const routes: Routes = [
  {
    path: '',
    component: UsgPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgPageRoutingModule {}
