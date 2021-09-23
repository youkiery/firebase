import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDetailRoutingModule } from './detail-routing.module';

import { AdminDetail } from './detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDetailRoutingModule
  ],
  declarations: [AdminDetail]
})
export class AdminDetailModule {}
