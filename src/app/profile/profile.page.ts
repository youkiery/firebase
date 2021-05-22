import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { InsertProfile } from './insert/insert.page';
import { RestService } from '../services/rest.service';
import { DetailPage } from './detail/detail.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public segment = '1'
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController,
  ) { }

  ngOnInit() {
    if (!this.rest.target.init) {
      this.getData()
    }
  }

  public async insertTarget() {
    if (this.rest.config.target < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
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
  }

  public async removeTarget(i: number) {
    if (this.rest.config.target < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
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
  }

  public async update(index: number) {
    const alert = await this.alert.create({
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
    const alert = await this.alert.create({
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

  public print(id: number) {
    this.rest.check({
      action: 'profile-print',
      id: id
    }).then(response => {
      let html = response.html
      let winPrint = window.open();
      winPrint.focus()
      winPrint.document.write(html);
      // if (!prev) {
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Hồ sơ sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.rest.check({
              action: 'profile-remove',
              id: id,
              keyword: this.rest.profile.filter.keyword,
              page: this.rest.profile.filter.page
            }).then(response => {
              this.rest.profile.list = response.list
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

  public info(index: number) {
    this.rest.profile.data2 = this.rest.target.list[index]
    this.rest.router.navigateByUrl('/profile/info')
  }

  public async insert() {
    this.rest.router.navigateByUrl('/profile/insert')
  }

  public async detail(id: number) {
    this.rest.check({
      action: 'profile-print',
      id: id
    }).then(response => {
      this.rest.profile.id = id
      this.rest.profile.print = response.html
      this.rest.router.navigateByUrl('profile/detail')
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public async loadData(event: any) {
    this.rest.profile.filter.page ++
    this.getData().then(() => {
      event.target.complete ()
    })
  }

  public filter() {
    this.rest.profile.filter.page = 1
    this.rest.profile.list = []
    this.getData()
  }

  public async getData() {
    return new Promise(resolve => {
      this.rest.check({
        action: 'profile-init',
        keyword: this.rest.profile.filter.keyword,
        page: this.rest.profile.filter.page,
      }).then(response => {
        this.rest.profile.list = this.rest.profile.list.concat(response.list)
        this.rest.profile.init = true
        this.rest.defreeze('load')
        resolve(true)
      }, () => {
        this.rest.defreeze('load')
        resolve(true)
      })
    }) 
  }
}
