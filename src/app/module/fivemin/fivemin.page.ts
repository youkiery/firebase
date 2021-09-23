import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-fivemin',
  templateUrl: './fivemin.page.html',
  styleUrls: ['./fivemin.page.scss'],
})
export class FiveminPage {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  public async ionViewWillEnter() {
    if (!this.rest.fivemin.init) {
      this.filter().then(() => {
        this.rest.fivemin.init = true
      }, () => {})
    }
  }

  public async detail(id: number, disable: number) {
    this.rest.fivemin.id = id
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.check({
      action: 'fivemin-get',
      act: 1,
      id: id
    }).then(response => {
      this.rest.fivemin.data = response.data
      this.rest.fivemin.gopy = response.gopy
      this.rest.fivemin.disable = disable
      this.rest.router.navigateByUrl('/fivemin/detail')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update(id: number, disable: number) {
    this.rest.fivemin.id = id
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.check({
      action: 'fivemin-get',
      act: 0,
      id: id
    }).then(response => {
      this.rest.fivemin.data = response.data
      this.rest.fivemin.disable = disable
      this.rest.router.navigateByUrl('/fivemin/update')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async preview(id: number) {
    await this.rest.freeze()
    this.rest.check({
      action: 'fivemin-preview',
      id: id
    }).then(response => {
      this.rest.fivemin.html = response.html
      this.rest.router.navigateByUrl('fivemin/preview')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Kế hoạch sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang xóa dữ liệu...')
    this.rest.check({
      action: 'fivemin-remove',
      id: id,
      page: this.rest.fivemin.filter.page
    }).then(() => {
      this.rest.fivemin.list = this.rest.fivemin.list.filter(item => {
        return id != item.id
      })
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insert() {
    this.rest.router.navigateByUrl('/fivemin/insert')
  }

  // public update(index = 0) {
    // if (!index) {
    //   this.rest.fivemin.data = {
    //     chamsoc: '',
    //     tugiac: '',
    //     giaiphap: '',
    //     uytin: '',
    //     ketqua: '',
    //     dongdoi: '',
    //     trachnhiem: '',
    //     tinhyeu: '',
    //     hoanthanh: ''
    //   }
    // }
    // else this.rest.fivemin.data = JSON.parse(JSON.stringify(this.rest.fivemin.list[this.rest.fivemin.index]))
    // this.rest.router.navigateByUrl('/fivemin/update')
  // }

  public more() {
    this.rest.fivemin.filter.page ++
    this.filter()
  }

  public static() {
    this.rest.router.navigateByUrl('/fivemin/static')
  }

  public async filter() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    return new Promise((resolve, reject) => {
      this.rest.check({
        action: 'fivemin-init',
        page: this.rest.fivemin.filter.page,
      }).then((response) => {
        this.rest.fivemin.list = this.rest.fivemin.list.concat(response.list)
        this.rest.defreeze()
        resolve(true)
      }, () => {
        this.rest.defreeze()
        reject()
      })
    })
  }
}
