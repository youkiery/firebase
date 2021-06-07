import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.page.html',
  styleUrls: ['./insert-item.page.scss'],
})
export class InsertItemPage implements OnInit {
  public data = {
    code: '',
    name: '',
    storage: 0,
    position: '',
    purchase: 0,
    transfer: 0
  }
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log(this.rest.expire.storage);
    if (!this.rest.expire.index) {
      if (this.rest.expire.storage.length) this.data.storage = this.rest.expire.storage[0].id
    }
  }

  public async insertStorage() {
    let alert = await this.rest.alert.create({
      message: 'Nhập tên kho',
      inputs: [{
        name: 'name',
        type: 'text'
      }],
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.insertStorageSubmit(e['name'])
          }
        }
      ]
    })
    alert.present()
  }

  public async insertStorageSubmit(name: string) {
    await this.rest.freeze()
    this.rest.check({
      action: 'expire-insert-storage',
      name: name
    }).then(resp => {
      this.rest.expire.storage = resp.list
      this.data.storage = this.rest.expire.storage[this.rest.expire.storage.length - 1].id
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async save() {
    await this.rest.freeze()
    this.rest.checkpost('expire-insert-item', this.data).then(resp => {
      this.rest.expire.item = [resp.data].concat(this.rest.expire.item)
      this.rest.navCtrl.pop()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

}
