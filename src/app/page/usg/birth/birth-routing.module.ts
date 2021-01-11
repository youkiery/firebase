import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthPage } from './birth.page';

const routes: Routes = [
  {
    path: '',
    component: BirthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthPageRoutingModule {}
