import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinePageRoutingModule } from './vaccine-routing.module';

import { VaccinePage } from './vaccine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinePageRoutingModule
  ],
  declarations: [VaccinePage]
})
export class VaccinePageModule {}
