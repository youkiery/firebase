import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    if (!this.rest.target.init) {
      this.rest.freeze('load', 'Tải danh sách...')
      this.rest.check({
        action: 'target-init'
      }).then(response => {
        this.rest.target.list = response.list
        this.rest.target.init = true
        this.rest.defreeze('load')
      }, () => {
        this.rest.defreeze('load')
      })
    }
  }

  async insert() {
    const alert = await this.alertCtrl.create({
      header: 'Thêm chỉ tiêu',
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: 'Tên chỉ tiêu'
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'primary',
          handler: (e) => {
            this.rest.freeze('cs', 'Đang thêm chỉ tiêu...')
            this.rest.check({
              action: 'target-insert',
              name: e['name'],
            }).then(response => {
              this.rest.notify('Đã thêm chỉ tiêu')
              this.rest.target.list = response.list
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

  public async remove(i: number) {
    const alert = await this.alertCtrl.create({
      header: 'Xóa chỉ tiêu',
      message: 'Sau khi xác nhận, chỉ tiêu sẽ bị xóa',
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
              action: 'target-remove',
              id: this.rest.target.list[i].id,
            }).then(response => {
              this.rest.notify('Đã xóa chỉ tiêu')
              this.rest.target.list = response.list
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

  public async update(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Tăng số chỉ tiêu',
      message: 'Sau khi xác nhận, chỉ tiêu sẽ tăng thêm',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.rest.freeze('load', 'Cập nhật...')
            this.rest.check({
              action: 'target-update',
              id: this.rest.target.list[index].id
            }).then(response => {
              this.rest.target.list[index].number = Number(this.rest.target.list[index].number) + 1
              this.rest.defreeze('load')
            }, () => {
              this.rest.defreeze('load')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  public async reset(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Cài lại chỉ tiêu',
      message: 'Sau khi xác nhận, chỉ tiêu bằng 0',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.rest.freeze('load', 'Cài lại...')
            this.rest.check({
              action: 'target-reset',
              id: this.rest.target.list[index].id
            }).then(response => {
              this.rest.target.list[index].number = 0
              this.rest.defreeze('load')
            }, () => {
              this.rest.defreeze('load')
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
