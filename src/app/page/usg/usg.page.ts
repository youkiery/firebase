import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-usg',
  templateUrl: './usg.page.html',
  styleUrls: ['./usg.page.scss'],
})
export class UsgPage implements OnInit {

  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ionViewDidEnter() {
    this.rest.freeze('va', 'Đang tải danh sách')
    this.filter().then(() => {
      this.rest.defreeze('va')
    })
  }

  public insert() {
    if (this.rest.config.usg < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.router.navigateByUrl('/usg/insert')
    }
  }
  
  public filter() {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'usg-auto',
        keyword: this.rest.usg.filterKey,
        status: this.rest.usg.status
      }).then(response => {
        this.rest.usg.data = response.data
        resolve('')
      }, () => {
        resolve('')
      })
    })
  }

  public filterM() {
    this.rest.router.navigateByUrl('/usg/filter')
  }

  public onSegmentChange() {
    this.rest.freeze('va', 'Đang tải danh sách')
    this.filter().then(() => {
      this.rest.defreeze('va')
    })
  }

  public changeStatus(id: number) {
    if (this.rest.config.usg < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.freeze('cs', 'Đang thay đổi trạng thái')
      this.rest.check({
        action: 'usg-check',
        id: id,
        keyword: this.rest.usg.filterKey,
        status: this.rest.usg.status
      }).then(response => {
        this.rest.notify('Đã thay đổi trạng thái')
        this.rest.usg.data = response.data
        this.rest.defreeze('cs')
      }, () => {
        this.rest.defreeze('cs')
      })
    }
  }

  public async birth(id: number) {
    if (this.rest.config.usg < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      let alert = await this.alert.create({
        message: 'Số lượng con sinh ra',
        inputs: [
          {
            type: 'number',
            name: 'number',
            value: 0
          }
        ],
        buttons: [
          {
            text: 'Bỏ',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'secondary',
            handler: (e) => {
              this.rest.freeze('kcheck', 'Đang hoàn thành...')
              this.rest.check({
                action: 'usg-birth',
                id: id,
                number: Number(e['number']),
                keyword: this.rest.usg.filterKey,
                status: this.rest.usg.status
              }).then((response) => {
                this.rest.usg.data = response.data
              }, () => {
                
              })
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async note(index: number, id: number, text: string) {
    if (this.rest.config.usg < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      let alert = await this.alert.create({
        message: 'Chỉnh sửa ghi chú',
        inputs: [
          {
            type: 'text',
            name: 'note',
            value: text
          }
        ],
        buttons: [
          {
            text: 'Bỏ',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'secondary',
            handler: (e) => {
              this.rest.freeze('kcheck', 'Đang hoàn thành...')
              this.rest.check({
                action: 'usg-note',
                id: id,
                text: e['note'],
                keyword: this.rest.usg.filterKey,
                status: this.rest.usg.status
              }).then(() => {
                this.rest.usg.data[index].note = e['note']
                this.rest.defreeze('kcheck')
              }, () => [
              ])
            }
          }
        ]
      })
      alert.present()
    }
  }
  
  ngOnInit() {}
}
