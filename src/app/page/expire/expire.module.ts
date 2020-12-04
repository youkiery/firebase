import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpirePageRoutingModule } from './expire-routing.module';

import { ExpirePage } from './expire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpirePageRoutingModule
  ],
  declarations: [ExpirePage]
})
export class ExpirePageModule {}
