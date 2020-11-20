import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinePage } from './vaccine.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinePage
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'suggest',
    loadChildren: () => import('./suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinePageRoutingModule {}
