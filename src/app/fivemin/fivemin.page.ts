import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fivemin',
  templateUrl: './fivemin.page.html',
  styleUrls: ['./fivemin.page.scss'],
})
export class FiveminPage {
  constructor(
    public rest: RestService,
    public photoService: PhotoService,
    public alert: AlertController
  ) { }

  public async ionViewWillEnter() {
    if (!this.rest.fivemin.init) {
      this.filter().then(() => {
        this.rest.fivemin.init = true
      }, () => {})
    }
  }

  public async detail(id: number) {
    this.rest.fivemin.id = id
    await this.rest.freeze()
    this.rest.check({
      action: 'fivemin-get',
      id: id
    }).then(response => {
      this.rest.fivemin.data = response.data
      this.rest.router.navigateByUrl('/fivemin/detail')
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
    this.rest.freeze('Đang xóa dữ liệu...')
    this.rest.check({
      action: 'fivemin-remove',
      id: id,
      page: this.rest.fivemin.filter.page,
      time: this.rest.isodatetotime(this.rest.fivemin.filter.time)
    }).then((response) => {
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

  public hoanthanh(id: number, status: number = 0, index) {
    this.rest.freeze('Đang lấy dữ liệu')
    this.rest.check({
      action: 'fivemin-hoanthanh',
      id: id,
      status: status,
      page: this.rest.fivemin.filter.page,
      time: this.rest.isodatetotime(this.rest.fivemin.filter.time)
    }).then(response => {
      this.rest.fivemin.thongke.danhsach = response.list
      this.rest.router.navigateByUrl('fivemin/statistic')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public update(index = 0) {
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
  }

  public filterButton() {
    this.rest.fivemin.filter.page = 1
    this.rest.fivemin.list = []
    this.rest.fivemin.thongke.dulieu = []
    this.filter()
  }

  public more() {
    this.rest.fivemin.filter.page ++
    this.filter()
  }

  public async filter() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    return new Promise((resolve, reject) => {
      if (this.rest.config.kaizen < 2) {
        this.rest.check({
          action: 'fivemin-init',
          page: this.rest.fivemin.filter.page,
          time: this.rest.isodatetotime(this.rest.fivemin.filter.time)
        }).then((response) => {
          this.rest.fivemin.list = this.rest.fivemin.list.concat(response.list)
          this.rest.defreeze()
          resolve(true)
        }, () => {
          this.rest.defreeze()
          reject()
        })
      }
      else {
        this.rest.check({
          action: 'fivemin-statistic',
          page: this.rest.fivemin.filter.page,
          time: this.rest.isodatetotime(this.rest.fivemin.filter.time)
        }).then((response) => {
          this.rest.fivemin.thongke.dulieu = this.rest.fivemin.thongke.dulieu.concat(response.list)
          this.rest.defreeze()
          resolve(true)
        }, () => {
          this.rest.defreeze()
          reject()
        })
      }
    })
  }
}
