import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugPage } from './drug.page';

const routes: Routes = [
  {
    path: '',
    component: DrugPage
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugPageRoutingModule {}
