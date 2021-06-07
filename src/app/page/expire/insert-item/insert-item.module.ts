import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertItemPageRoutingModule } from './insert-item-routing.module';

import { InsertItemPage } from './insert-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertItemPageRoutingModule
  ],
  declarations: [InsertItemPage]
})
export class InsertItemPageModule {}
