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

  public async ngOnInit() {
    await this.rest.freeze('Đang lấy danh sách')
    this.rest.check({
      action: 'expire-auto',
      fname: this.rest.expire.filter.name,
      ftime: this.rest.expire.filter.time
    }).then(response => {
      this.rest.expire.list = response.list
      this.rest.defreeze()
    }, (e) => {
      this.rest.defreeze()
    })
  }

  public async edit(id: number) {
    if (this.rest.config.expire < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.expire.id = id
      if (id) {
        await this.rest.freeze('Đang lấy thông tin')
        this.rest.check({
          action: 'expire-get',
          id: id
        }).then(response => {
          this.rest.expire.edit = response.data
          this.rest.defreeze()
        }, () => {
          this.rest.defreeze()
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
  }
  
  public async remove(id: number) {
    if (this.rest.config.expire < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
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
              this.removeSubmit(id)
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang xóa hạn sử dụng...')
    this.rest.check({
      action: 'expire-remove',
      id: id,
      status: this.rest.vaccine.status
    }).then((response) => {
      this.rest.expire.list = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public filterM() {
    this.rest.router.navigateByUrl('/expire/filter')
  }
}
