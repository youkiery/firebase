import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaiminPage } from './kaimin.page';

const routes: Routes = [
  {
    path: '',
    component: KaiminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaiminPageRoutingModule {}
