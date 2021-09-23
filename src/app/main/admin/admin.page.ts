import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { AdminDetail } from './detail/detail.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController
  ) { }

  public async ionViewDidEnter() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.check({
      action: 'admin-user',
    }).then((data) => {
      let users = data.users
      // users.forEach((user, userindex) => {
      //   for (const moduleindex in user.module) {
      //     if (Object.prototype.hasOwnProperty.call(user.module, moduleindex)) {
      //       const module = user.module[moduleindex];
      //       users[userindex].module[moduleindex] = this.isBool(module)
      //     }
      //   }
      // });
      this.rest.admin.users = users
      this.rest.admin.config = data.config
      this.rest.defreeze()
    }, () => {})
  }

  // public isBool(number: number) {
  //   if (Number(number)) return true
  //   return false
  // }

  ngOnInit() {
  }

  public async remove(userid: number) {
    let alert = await this.alert.create({
      message: 'Xóa nhân viên?',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.removeSubmit(userid)
          }
        }
      ]
    })
    alert.present()
  }

  public async removeSubmit(userid: number) {
    await this.rest.freeze('Đang xóa...')
    this.rest.checkpost('admin-remove', {
      id: userid
    }).then(resp => {
      this.rest.defreeze()
      this.rest.admin.users = resp.users
      this.rest.notify('Đã xóa nhân viên')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail(index: number) {
    this.rest.admin.index = index
    let modal = await this.modal.create({
      component: AdminDetail,
      componentProps: {username: this.rest.admin.users[index].username }
    })
    modal.present()
  }
}
