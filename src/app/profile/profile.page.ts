import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { RestService } from '../services/rest.service';

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
    public platform: Platform
  ) { }

  ngOnInit() {
    if (!this.rest.profile.init) {
      this.getData()
      this.rest.profile.filter.page ++
    }
  }

  public info(index: number) {
    this.rest.profile.data2 = this.rest.profile.target[index]
    this.rest.router.navigateByUrl('/profile/info')
  }

  public updateTarget(index: number) {
    if (this.rest.config.profile < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.profile.data2 = this.rest.profile.target[index]
      this.rest.router.navigateByUrl('/profile/update')
    }
  }

  public async insertTarget() {
    if (this.rest.config.profile < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.profile.data2 = {
        id: 0,
        name: '',
        intro: '',
        unit: '',
        flag: '0 - 1',
        up: '',
        down: '',
        disease: '',
        aim: ''
      }
      this.rest.router.navigateByUrl('profile/update')
    }
  }

  public async removeTarget(i: number) {
    if (this.rest.config.profile < 2) this.rest.notify('Chưa cấp quyền truy cập')
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
              this.removeTargetSubmit(i)
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async removeTargetSubmit(i: number) {
    await this.rest.freeze('Đang xóa chỉ tiêu...')
    this.rest.check({
      action: 'target-remove',
      id: this.rest.profile.target[i].id,
      key: this.rest.profile.filter.key
    }).then(response => {
      this.rest.notify('Đã xóa chỉ tiêu')
      this.rest.profile.target = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
            this.updateSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async updateSubmit(index: number) {
    await this.rest.freeze('Cập nhật...')
    this.rest.check({
      action: 'target-update',
      id: this.rest.profile.target[index].id
    }).then(response => {
      this.rest.profile.target[index].number = Number(this.rest.profile.target[index].number) + 1
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
            this.resetSubmit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async resetSubmit(index: number) {
    await this.rest.freeze('Cài lại...')
    this.rest.check({
      action: 'target-reset',
      id: this.rest.profile.target[index].id,
      key: this.rest.profile.filter.key
    }).then(response => {
      this.rest.profile.target[index].number = 0
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public print(id: number) {
    if (this.platform.platforms().indexOf('mobile') >= 0) {
      // mobile
      this.rest.notify('Không tìm thấy máy in')
    }
    else {
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
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public search() {
    this.rest.check({
      action: 'target-search',
      key: this.rest.profile.filter.key
    }).then((response) => {
      this.rest.profile.target = response.list
    }, () => { })
  }

  public async remove(id: number) {
    if (this.rest.config.profile < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
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
              this.removeSubmit(id)
            }
          }
        ]
      });

      await alert.present();
    }
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang xóa...')
    this.rest.check({
      action: 'profile-remove',
      id: id,
      keyword: this.rest.profile.filter.keyword,
      page: this.rest.profile.filter.page
    }).then(response => {
      this.rest.profile.list = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insert() {
    this.rest.profile.suggest.select.phone = ''
    this.rest.router.navigateByUrl('/profile/insert')
  }

  public async detail(id: number) {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.check({
      // action: 'profile-get',
      action: 'profile-print',
      id: id
    }).then(response => {
      this.rest.profile.id = id
      // this.rest.profile.data = response.data
      this.rest.profile.print = response.html
      this.rest.router.navigateByUrl('profile/detail')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
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
        this.rest.profile.init = 1
        resolve(true)
      }, () => {
        resolve(true)
      })
    }) 
  }
}
