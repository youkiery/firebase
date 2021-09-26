import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewDidEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('home')
  }

  public suggest() {
    this.rest.router.navigateByUrl('/modal/suggest')
  }

  public async insertSubmit() {
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Thêm lịch nhắc...')
      this.rest.temp.type = this.rest.vaccine.type[this.rest.temp.vaccine].id
      this.rest.temp.vaccine = this.rest.vaccine.type[this.rest.temp.vaccine].id
      this.rest.checkpost('vaccine-insert', this.rest.temp).then(resp => {
        this.rest.vaccine.new = resp.new
        if (resp.old.length) {
          this.rest.vaccine.old = resp.old
          this.rest.router.navigateByUrl('/modal/recall')
        }
        this.clear()
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async remove(index: number) {
    const alert = await this.alert.create({
      message: 'Xóa lịch tiêm phòng?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.removeSubmit(this.rest.vaccine.new[index].id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Xóa lịch nhắc...')
    this.rest.checkpost('vaccine-remove', {
      id: id
    }).then(resp => {
      this.rest.vaccine.new = resp.new
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index: number) {
    this.rest.temp = {
      id: this.rest.vaccine.new[index].id,
      name: this.rest.vaccine.new[index].name,
      phone: this.rest.vaccine.new[index].phone,
      vaccine: Number(this.rest.typeIndex(this.rest.vaccine.new[index].vaccine)),
      cometime: this.rest.vaccine.new[index].cometime,
      calltime: this.rest.vaccine.new[index].calltime,
    }
  }

  public async updateSubmit() {
    await this.rest.freeze('Thêm lịch nhắc...')
    this.rest.temp.type = this.rest.vaccine.type[this.rest.temp.vaccine].id
    this.rest.temp.filter = this.rest.vaccine.filter
    this.rest.checkpost('vaccine-update', this.rest.temp).then(resp => {
      if (this.rest.temp.prv) {
        this.rest.vaccine.temp = resp.list
        console.log(this.rest.temp.prv);
        this.rest.action = this.rest.temp.prv
        this.rest.defreeze()
        this.rest.navCtrl.pop()
      }
      else {
        this.rest.vaccine.new = resp.new
        this.rest.vaccine.list = resp.list
        this.clear()
        this.rest.defreeze()
        if (this.rest.vaccine.filter) this.rest.navCtrl.pop()
      }
    }, () => {
      this.rest.defreeze()
    })
  }

  public clear() {
    this.rest.temp.id = 0
    this.rest.temp.name = ''
    this.rest.temp.phone = ''
  }
}