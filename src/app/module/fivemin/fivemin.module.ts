import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiveminPageRoutingModule } from './fivemin-routing.module';

import { FiveminPage } from './fivemin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiveminPageRoutingModule
  ],
  declarations: [FiveminPage]
})
export class FiveminPageModule {}
