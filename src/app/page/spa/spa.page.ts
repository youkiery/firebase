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
    await this.rest.freeze('Lấy danh sách spa')
    return new Promise((resolve) => {
      this.filter().then(() => {
        this.rest.defreeze()
        resolve(true)
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

  public insert() {
    if (this.rest.config.spa < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.spa.edit = {
        id: 0,
        name: '',
        phone: '',
        note: '',
        image: [],
        type: JSON.parse(JSON.stringify(this.rest.spa.type))
      }
      this.rest.router.navigateByUrl('/spa/insert')
    }
  }

  public detail(id: number) {
    this.rest.check({
      action: 'spa-get',
      id: id
    }).then(response => {
      this.rest.spa.edit = response.data
      this.rest.router.navigateByUrl('/spa/insert')
    })
  }

  public async done(id: number) {
    if (this.rest.config.spa < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      await this.rest.freeze('Đang hoàn thành')
      this.rest.check({
        action: 'spa-done',
        id: id,
        current: this.rest.spa.current.time
      }).then((response) => {
        this.rest.spa.time = response.time
        this.rest.spa.data = response.data
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
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
            this.rest.spa.current = this.rest.parseDate(e.date)
            this.filterPickDate()
          }
        }
      ]
    })
    alert.present()
  }

  public async filterPickDate() {
    await this.rest.freeze('Lấy danh sách spa')
    this.filter().then(() => {
      this.rest.defreeze()
    })      
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
        resolve(true)
      }, () => {
        this.checked = false
        resolve(true)
      })
    })
  }

  public async changeDate(amount: number) {
    let time = this.rest.spa.current.time / 1000 + amount * 60 * 60 * 24
    this.rest.spa.current = this.rest.parseDate(time)
    await this.rest.freeze('Lấy danh sách spa')
    this.filter().then(() => {
      this.rest.defreeze()
    })
  }
}

