import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    public modal: ModalController
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
      this.rest.defreeze()
    }, () => {})
  }

  // public isBool(number: number) {
  //   if (Number(number)) return true
  //   return false
  // }

  ngOnInit() {
  }

  public async detail(index: number) {
    this.rest.admin.index = index
    let modal = await this.modal.create({
      component: AdminDetail
    })
    modal.present()
  }
}
