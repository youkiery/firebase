import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertProfile } from './insert.page';

const routes: Routes = [
  {
    path: '',
    component: InsertProfile
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertProfileRoutingModule {}
