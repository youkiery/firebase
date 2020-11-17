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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinePageRoutingModule {}
