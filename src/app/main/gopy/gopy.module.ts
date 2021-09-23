import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GopyPageRoutingModule } from './gopy-routing.module';

import { GopyPage } from './gopy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GopyPageRoutingModule
  ],
  declarations: [GopyPage]
})
export class GopyPageModule {}
