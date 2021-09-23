import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugPageRoutingModule } from './drug-routing.module';

import { DrugPage } from './drug.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugPageRoutingModule
  ],
  declarations: [DrugPage]
})
export class DrugPageModule {}
