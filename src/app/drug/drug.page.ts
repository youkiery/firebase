import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { DetailPage } from './detail/detail.page';
import { InsertPage } from './insert/insert.page';

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

  filter() {
    this.rest.freeze('filter', 'Đang lọc thuốc')
    this.rest.check({
      action: 'drug-filter',
      name: this.rest.drug.filter.name,
      effect: this.rest.drug.filter.effect,
      target: this.rest.drug.filter.target
    }).then(response => {
      this.rest.drug.list = response.data
      this.rest.defreeze('filter')
    }, (response) => {
      this.rest.notify(response.messenger)
      this.rest.defreeze('filter')
    })
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
      component: DetailPage,
    })
    return await modal.present()
  }
}
