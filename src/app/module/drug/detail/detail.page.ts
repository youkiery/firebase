import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { InsertPage } from '../insert/insert.page';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(
    public modal: ModalController,
    public rest: RestService,
  ) { }

  ngOnInit() {
  }

  async update() {
    if (this.rest.config.drug < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.drug.update = true
      const modal = await this.modal.create({
        component: InsertPage,
      })
      await modal.present()
    }
    // this.rest.navCtrl.pop()
  }

  public async view(image: string) {
    this.rest.temp.image = image
    let modal = await this.modal.create({
      component: ModalPage
    })
    await modal.present()
  }
}

