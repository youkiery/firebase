import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiveminPage } from './fivemin.page';

const routes: Routes = [
  {
    path: '',
    component: FiveminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiveminPageRoutingModule {}
