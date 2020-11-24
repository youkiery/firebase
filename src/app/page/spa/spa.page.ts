import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-spa',
  templateUrl: './spa.page.html',
  styleUrls: ['./spa.page.scss'],
})
export class SpaPage implements OnInit {
  interval = null
  checked = false
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    // loading spa list on start
    return new Promise((resolve) => {
      this.rest.freeze('sa', 'Lấy danh sách spa')
      this.filter().then(() => {
        this.rest.defreeze('sa')
        resolve()
      })      
    }).then(() => {
      // auto refresh every 5 second
      // if not got any data, no other post send
      this.interval = setInterval(() => {
        if (!this.checked) {
          this.filter()
        }
      }, 5000)
    })
  }

  ionViewDidLeave() {
    clearInterval(this.interval)
  }

  public done(id: number) {
    this.rest.freeze('done', 'Đang hoàn thành')
    this.rest.check({
      action: 'spa-done',
      id: id,
      current: this.rest.spa.current.time
    }).then((response) => {
      this.rest.spa.time = response.time
      this.rest.spa.data = response.data
      this.rest.defreeze('done')
    }, () => {
      this.rest.defreeze('done')
    })
  }

  public async pickDate() {
    let alert = await this.alert.create({
      header: 'Chọn ngày',
      inputs: [
        {
          label: 'Ngày',
          name: 'date',
          type: 'date',
          value: this.rest.spa.current.datestring
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
            console.log(e);
            this.rest.spa.current = this.rest.parseDate(e.date)
            this.rest.freeze('sa', 'Lấy danh sách spa')
            this.filter().then(() => {
              this.rest.defreeze('sa')
            })      
          }
        }
      ]
    })
    alert.present()
  }

  public filter() {
    return new Promise((resolve) => {
      this.checked = true
      this.rest.check({
        action: 'spa-auto',
        time: this.rest.spa.time,
        current: this.rest.spa.current.time
      }).then((response) => {
        if (response.data) {
          this.rest.spa.data = response.data
          this.rest.spa.time = response.time
        }
        this.checked = false
        resolve()
      }, () => {
        this.checked = false
        resolve()
      })
    })
  }

  public changeDate(amount: number) {
    let time = this.rest.spa.current.time / 1000 + amount * 60 * 60 * 24
    this.rest.spa.current = this.rest.parseDate(time)
    this.rest.freeze('sa', 'Lấy danh sách spa')
    this.filter().then(() => {
      this.rest.defreeze('sa')
    })      
  }
}
