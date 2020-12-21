import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
  private page = ['col', 'pay']
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() { }
  
  ionViewDidEnter() {
    this.rest.freeze('ra', 'Lấy danh sách...')
    this.rest.check({
      action: 'ride-init',
      type: this.rest.ride.selected,
      time: this.rest.ride.current.time / 1000
    }).then(response => {
      this.rest.ride.list = response.list
      this.rest.defreeze('ra')
    }, () => {
      this.rest.defreeze('ra')
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Phiếu bị xóa sẽ mất vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.rest.freeze('rr', 'Xóa phiếu...')
            this.rest.check({
              action: 'ride-remove',
              id: id,
              time: this.rest.ride.current.time / 1000,
              type: this.rest.ride.selected
            }).then(response => {
              this.rest.ride.list[this.rest.ride.selected] = response.list
              this.rest.defreeze('rr')
            }, () => {
              this.rest.defreeze('rr')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  public insert() {
    if (Number(this.rest.ride.selected)) {
      // pay
      this.rest.ride.edit['amount'] = '0'
      this.rest.ride.edit['note'] = ''
    }
    else {
      // col
      this.rest.ride.edit['doctorid']  = this.rest.list.employ[0].userid
      this.rest.ride.edit['from']  = String(this.rest.ride.clock)
      this.rest.ride.edit['end']  = String(this.rest.ride.clock + 1)
      this.rest.ride.edit['amount']  = '10,000'
      this.rest.ride.edit['destination']  = ''
      this.rest.ride.edit['note']  = ''
    }
    this.rest.router.navigateByUrl('/ride/' + this.page[this.rest.ride.selected])
  }
  
  public async pickDate() {
    let alert = await this.alert.create({
      header: 'Chọn ngày',
      inputs: [
        {
          label: 'Ngày',
          name: 'date',
          type: 'date',
          value: this.rest.ride.current.datestring
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Chọn ngày',
          cssClass: 'secondary',
          handler: (e) => {
            this.rest.ride.current = this.rest.parseDate(e.date)
            this.rest.freeze('sa', 'Lấy danh sách ride')
            this.filter()
          }
        }
      ]
    })
    alert.present()
  }

  public filter() {
    this.rest.freeze('ra', 'Lấy danh sách...')
    this.rest.check({
      action: 'ride-auto',
      type: this.rest.ride.selected,
      time: this.rest.ride.current.time / 1000
    }).then(response => {
      this.rest.ride.list[this.rest.ride.selected] = response.list
      this.rest.defreeze('ra')
    }, () => {
      this.rest.defreeze('ra')
    })
  }

  public changeDate(amount: number) {
    let time = this.rest.ride.current.time / 1000 + amount * 60 * 60 * 24
    this.rest.ride.current = this.rest.parseDate(time)
    this.filter()
  }
}
