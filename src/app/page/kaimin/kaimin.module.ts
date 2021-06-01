import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KaiminPageRoutingModule } from './kaimin-routing.module';

import { KaiminPage } from './kaimin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KaiminPageRoutingModule
  ],
  declarations: [KaiminPage]
})
export class KaiminPageModule {}
