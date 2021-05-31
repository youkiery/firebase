import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { DetailPage } from './detail/detail.page';
import { InsertPage } from './insert/insert.page';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.page.html',
  styleUrls: ['./drug.page.scss'],
})
export class DrugPage implements OnInit {
  public id = 0
  constructor(
    public modalCtrl: ModalController,
    public rest: RestService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {

  }

  public async filter() {
    await this.rest.freeze('Đang lọc thuốc')
    this.rest.check({
      action: 'drug-filter',
      key_name: this.rest.drug.filter.name,
      key_effect: this.rest.drug.filter.effect
    }).then(response => {
      this.rest.drug.list = response.data
      this.rest.defreeze()
    }, (response) => {
      this.rest.notify(response.messenger)
      this.rest.defreeze()
    })
  }

  public async insert() {
    if (this.rest.config.drug < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.drug.index = 0
      this.rest.drug.update = false
      const modal = await this.modalCtrl.create({
        component: InsertPage,
      })
      return await modal.present()
    }
  }

  public async detail(index: number) {
    this.rest.drug.index = index
    this.rest.router.navigateByUrl('/drug/detail')
  }

  public async remove(id: number) {
    if (this.rest.config.drug < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alertCtrl.create({
        header: 'Xóa thuốc',
        message: 'Sau khi xác nhận, thuốc sẽ bị xóa',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'danger',
            handler: () => {
              this.removeSubmit()
              this.id = id
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async removeSubmit() {
    await this.rest.freeze('Đang xóa chỉ tiêu...')
    this.rest.check({
      action: 'drug-remove',
      id: this.id,
      key_name: this.rest.drug.filter.name,
      key_effect: this.rest.drug.filter.effect
    }).then(response => {
      this.rest.notify('Đã xóa thuốc')
      this.rest.drug.list = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
