import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {
  constructor(
    public rest: RestService,
    public alert: AlertController,
    public modal: ModalController
  ) { }

  public async ionViewDidEnter() {
    await this.rest.freeze('Đang tải danh sách')
    this.filter().then(() => {
      this.rest.defreeze()
    })
  }
  
  public filter() {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'vaccine-auto',
        status: this.rest.vaccine.status
      }).then(response => {
        response.data.forEach((item: any, index: number) => {
          response.data[index]['calltime'] = this.rest.parseDate(response.data[index]['calltime'])
        });
        this.rest.vaccine.data = response.data
        resolve('')
      }, () => {
        resolve('')
      })
    })
  }

  public filterM() {
    this.rest.router.navigateByUrl('/vaccine/filter')
  }

  public async onSegmentChange() {
    await this.rest.freeze('Đang tải danh sách')
    this.filter().then(() => {
      this.rest.defreeze()
    })
  }

  
  public async changeStatus(id: number) {
    if (this.rest.config.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const alert = await this.alert.create({
        header: 'Chú ý!!!',
        message: 'Vaccine sẽ chuyển sang tab khác',
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'danger',
            handler: () => {
              this.changeStatusSubmit(id)
            }
          }
        ]
      });
  
      await alert.present();
    }
  }

  public async changeStatusSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.check({
      action: 'vaccine-check',
      id: id,
      status: this.rest.vaccine.status
    }).then(response => {
      this.rest.notify('Đã thay đổi trạng thái')
      response.data.forEach((item: any, index: number) => {
        response.data[index]['calltime'] = this.rest.parseDate(response.data[index]['calltime'])
      });
      this.rest.vaccine.data = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async note(index: number, id: number, text: string) {
    if (this.rest.config.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
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
              this.noteSubmit(id, index, e['note'])
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
      action: 'vaccine-note',
      id: id,
      text: note,
      status: this.rest.vaccine.status
    }).then(() => {
      this.rest.vaccine.data[index].note = note
      this.rest.defreeze()
    }, () => [
    ])
  }

  public insert() {
    if (this.rest.config.vaccine < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.router.navigateByUrl('/vaccine/insert')
    }
  }
  
  ngOnInit() {}

}
