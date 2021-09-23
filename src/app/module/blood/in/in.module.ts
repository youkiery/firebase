import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InPageRoutingModule } from './in-routing.module';

import { InPage } from './in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InPageRoutingModule
  ],
  declarations: [InPage]
})
export class InPageModule {}
