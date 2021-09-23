import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloodPageRoutingModule } from './blood-routing.module';

import { BloodPage } from './blood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodPageRoutingModule
  ],
  declarations: [BloodPage]
})
export class BloodPageModule {}
