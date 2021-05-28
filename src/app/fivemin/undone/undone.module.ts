import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UndonePageRoutingModule } from './undone-routing.module';

import { UndonePage } from './undone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UndonePageRoutingModule
  ],
  declarations: [UndonePage]
})
export class UndonePageModule {}
