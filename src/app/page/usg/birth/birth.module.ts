import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthPageRoutingModule } from './birth-routing.module';

import { BirthPage } from './birth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthPageRoutingModule
  ],
  declarations: [BirthPage]
})
export class BirthPageModule {}
