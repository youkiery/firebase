import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GopyPage } from './gopy.page';

const routes: Routes = [
  {
    path: '',
    component: GopyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GopyPageRoutingModule {}
