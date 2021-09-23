import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsgPageRoutingModule } from './usg-routing.module';

import { UsgPage } from './usg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsgPageRoutingModule
  ],
  declarations: [UsgPage]
})
export class UsgPageModule {}
