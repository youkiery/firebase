import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaPage } from './spa.page';

const routes: Routes = [
  {
    path: '',
    component: SpaPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'suggest',
    loadChildren: () => import('./suggest/suggest.module').then( m => m.SuggestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaPageRoutingModule {}
