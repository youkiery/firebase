import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  public async ionViewWillEnter() {
    this.rest.action = 'item'
    if (!this.rest.item.init) {
      this.init()
    }
  }

  public async init() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item-init', {
      keyword: this.rest.item.keyword
    }).then(resp => {
      this.rest.item.init = 1
      this.rest.item.purchase = resp.purchase
      this.rest.item.transfer = resp.transfer
      this.rest.item.expired = resp.expired
      this.rest.item.list = resp.list
      this.rest.item.all = resp.all
      this.rest.item.image = resp.image
      this.rest.item.catlist = resp.catlist
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item-filter', {
      keyword: this.rest.item.keyword
    }).then(resp => {
      this.rest.item.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public purchase() {
    this.rest.temp = {
      action: 'purchase',
      step: 1,
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public transfer() {
    this.rest.temp = {
      action: 'transfer',
      step: 1,
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public expired() {
    this.rest.temp = {
      action: 'expired',
      step: 1,
      list: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }

  public view(posid: number) {
    this.rest.temp.image = this.rest.item.image[posid]
    this.rest.navCtrl.navigateForward('modal/detail')
  }

  public insertItem() {
    this.rest.temp = {
      action: 'item',
      id: 0,
      cat: (this.rest.item.catlist.length ? this.rest.item.catlist[0].id.toString() : 0),
      name: '',
      code: '',
      border: 10,
      image: []
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public updateItem(index: number) {
    this.rest.temp = {
      action: 'item',
      id: this.rest.item.list[index].id,
      cat: this.rest.item.list[index].cat,
      name: this.rest.item.list[index].name,
      code: this.rest.item.list[index].code,
      border: this.rest.item.list[index].border,
      image: this.rest.item.list[index].image
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }

  public async removeItem(id: number) {
    const alert = await this.alert.create({
      message: 'Hàng hóa sẽ biến mất vĩnh viễn, xác nhận?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeItemSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeItemSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item-remove', {
      id: id,
      keyword: this.rest.item.keyword
    }).then((resp) => {
      this.rest.item.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insertExpire() {
    this.rest.temp = {
      action: 'expire',
      name: '',
      code: '',
      expire: this.rest.today,
      number: 1
    }
    this.rest.navCtrl.navigateForward('modal/item')
  }
  public position() {
    if (this.rest.config.item < 2) this.rest.notify('Không có quyền truy cập')
    else {
      this.rest.temp = {
        action: 'position',
        keyword: '',
        list: []
      }
      this.rest.navCtrl.navigateForward('modal/item')
    }
  }
}
