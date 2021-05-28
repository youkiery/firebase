import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UndonePage } from './undone.page';

const routes: Routes = [
  {
    path: '',
    component: UndonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UndonePageRoutingModule {}
