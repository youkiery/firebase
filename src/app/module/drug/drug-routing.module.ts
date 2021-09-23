import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugPage } from './drug.page';

const routes: Routes = [
  {
    path: '',
    component: DrugPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugPageRoutingModule {}
