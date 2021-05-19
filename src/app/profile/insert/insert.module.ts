import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertProfileRoutingModule } from './insert-routing.module';

import { InsertProfile } from './insert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertProfileRoutingModule
  ],
  declarations: [InsertProfile]
})
export class InsertProfileModule {}
