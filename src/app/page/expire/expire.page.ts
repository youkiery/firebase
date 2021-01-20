import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-expire',
  templateUrl: './expire.page.html',
  styleUrls: ['./expire.page.scss'],
})
export class ExpirePage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
    this.rest.freeze('auto', 'Đang lấy danh sách')
    this.rest.check({
      action: 'expire-auto',
      fname: this.rest.expire.filter.name,
      ftime: this.rest.expire.filter.time
    }).then(response => {
      this.rest.expire.list = response.list
      this.rest.defreeze('auto')
    }, (e) => {
      this.rest.defreeze('auto')
    })
  }

  public edit(id: number) {
    this.rest.expire.id = id
    if (id) {
      this.rest.freeze('ee', 'Đang lấy thông tin')
      this.rest.check({
        action: 'expire-get',
        id: id
      }).then(response => {
        this.rest.expire.edit = response.data
        this.rest.defreeze('ee')
      }, () => {
        this.rest.defreeze('ee')
      })
    }
    else {
      this.rest.expire.edit = {
        id: 0,
        name: '',
        rid: 0,
        number: 0,
        expire: this.rest.today
      }
    }
    this.rest.router.navigateByUrl('expire/insert')
  }
  
  public async remove(id: number) {
    let alert = await this.alert.create({
      message: 'Xóa hạn sử dụng',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.rest.freeze('kcheck', 'Đang xóa hạn sử dụng...')
            this.rest.check({
              action: 'expire-remove',
              id: id,
              status: this.rest.vaccine.status
            }).then((response) => {
              this.rest.expire.list = response.list
              this.rest.defreeze('kcheck')
            }, () => {
              this.rest.defreeze('kcheck')
            })
          }
        }
      ]
    })
    alert.present()
  }

  public filterM() {
    this.rest.router.navigateByUrl('/expire/filter')
  }
}
