import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { FilterPage } from '../drug/filter/filter.page';
import { InsertPage } from './insert/insert.page';

@Component({
  template: `
  <ion-toolbar color="success">
    <ion-button color="light" fill="clear" (click)="this.modal.dismiss()">
      <ion-icon name="chevron-back-outline"></ion-icon>
    </ion-button>
  </ion-toolbar>

  <ion-content>
    <div class="pad">
      <p> Tên: {{rest.drug.list[rest.drug.index].name}} </p>
      <p> Điều trị bệnh: {{rest.drug.list[rest.drug.index].disease}} </p>
      <p> Hiệu quả với: {{rest.drug.list[rest.drug.index].effective}} </p>
      <p> Liều dùng: {{rest.drug.list[rest.drug.index].limit}} </p>
      <p> Công dụng: {{rest.drug.list[rest.drug.index].effect}} </p>
    </div>
  </ion-content>`
})
export class DrugDetail {
  constructor(
    public modal: ModalController,
    public rest: RestService,
  ) {

  }
}

@Component({
  selector: 'app-drug',
  templateUrl: './drug.page.html',
  styleUrls: ['./drug.page.scss'],
})
export class DrugPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public rest: RestService
  ) { }

  ngOnInit() {
    
  }

  async filter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
    })
    return await modal.present()
  }

  async insert() {
    const modal = await this.modalCtrl.create({
      component: InsertPage,
    })
    return await modal.present()
  }

  async detail(index: number) {
    this.rest.drug.index = index
    const modal = await this.modalCtrl.create({
      component: DrugDetail,
    })
    return await modal.present()
  }
}
