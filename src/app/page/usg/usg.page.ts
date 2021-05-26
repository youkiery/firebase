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

  public async ionViewDidEnter() {
    await this.rest.freeze('Đang tải danh sách')
    this.filter().then(() => {
      this.rest.defreeze()
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

  public async onSegmentChange() {
    await this.rest.freeze('Đang tải danh sách')
    this.filter().then(() => {
      this.rest.defreeze()
    })
  }

  public async changeStatus(id: number) {
    if (this.rest.config.usg < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      await this.rest.freeze('Đang thay đổi trạng thái')
      this.rest.check({
        action: 'usg-check',
        id: id,
        keyword: this.rest.usg.filterKey,
        status: this.rest.usg.status
      }).then(response => {
        this.rest.notify('Đã thay đổi trạng thái')
        this.rest.usg.data = response.data
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
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
              this.birthSubmit(id, e['number'])
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async birthSubmit(id: number, number: number) {
    await this.rest.freeze('Đang hoàn thành...')
    this.rest.check({
      action: 'usg-birth',
      id: id,
      number: Number(number),
      keyword: this.rest.usg.filterKey,
      status: this.rest.usg.status
    }).then((response) => {
      this.rest.usg.data = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
              this.noteSubmit(id, e['note'])
            }
          }
        ]
      })
      alert.present()
    }
  }

  public async noteSubmit(id: number, index: number, note: string) {
    await this.rest.freeze('Đang hoàn thành...')
    this.rest.check({
      action: 'usg-note',
      id: id,
      text: note,
      keyword: this.rest.usg.filterKey,
      status: this.rest.usg.status
    }).then(() => {
      this.rest.usg.data[index].note = note
      this.rest.defreeze()
    }, () => [
    ])
  }
  
  ngOnInit() {}
}
