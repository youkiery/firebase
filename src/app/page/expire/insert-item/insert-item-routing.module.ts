import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertItemPage } from './insert-item.page';

const routes: Routes = [
  {
    path: '',
    component: InsertItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertItemPageRoutingModule {}
