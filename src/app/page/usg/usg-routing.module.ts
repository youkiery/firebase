import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsgPage } from './usg.page';

const routes: Routes = [
  {
    path: '',
    component: UsgPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'suggest',
    loadChildren: () => import('./suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'birth',
    loadChildren: () => import('./birth/birth.module').then( m => m.BirthPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgPageRoutingModule {}
