import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisPageRoutingModule } from './his-routing.module';

import { HisPage } from './his.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisPageRoutingModule
  ],
  declarations: [HisPage]
})
export class HisPageModule {}
