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
  constructor(
    public modalCtrl: ModalController,
    public rest: RestService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.rest.check({
      action: 'drug-init',
    }).then(response => {
      this.rest.drug.role = response.role
    }, () => { })
  }

  public filter() {
    this.rest.freeze('filter', 'Đang lọc thuốc')
    this.rest.check({
      action: 'drug-filter',
      key_name: this.rest.drug.filter.name,
      key_effect: this.rest.drug.filter.effect
    }).then(response => {
      this.rest.drug.list = response.data
      this.rest.defreeze('filter')
    }, (response) => {
      this.rest.notify(response.messenger)
      this.rest.defreeze('filter')
    })
  }

  public async insert() {
    if (!this.rest.drug.role) this.rest.notify('Không có quyền truy cập')
    else {
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
    if (!this.rest.drug.role) this.rest.notify('Không có quyền truy cập')
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
              this.rest.freeze('cs', 'Đang xóa chỉ tiêu...')
              this.rest.check({
                action: 'drug-remove',
                id: id,
                key_name: this.rest.drug.filter.name,
                key_effect: this.rest.drug.filter.effect
              }).then(response => {
                this.rest.notify('Đã xóa thuốc')
                this.rest.drug.list = response.data
                this.rest.defreeze('cs')
              }, () => {
                this.rest.defreeze('cs')
              })
            }
          }
        ]
      });

      await alert.present();
    }
  }
}

