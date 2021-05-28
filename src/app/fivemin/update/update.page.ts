import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  public async update() {
    await this.rest.freeze('Đang cập nhật')
    this.rest.check({
      action: 'fivemin-update',
      time: this.rest.totime(this.rest.fivemin.filter.time),
      // id: this.rest.fivemin.list[this.rest.fivemin.index].id,
      // chamsoc: this.rest.fivemin.data.chamsoc,
      // tugiac: this.rest.fivemin.data.tugiac,
      // giaiphap: this.rest.fivemin.data.giaiphap,
      // uytin: this.rest.fivemin.data.uytin,
      // ketqua: this.rest.fivemin.data.ketqua,
      // dongdoi: this.rest.fivemin.data.dongdoi,
      // trachnhiem: this.rest.fivemin.data.trachnhiem,
      // tinhyeu: this.rest.fivemin.data.tinhyeu,
      // hoanthanh: this.rest.fivemin.data.hoanthanh,
    }).then((response) => {
      this.rest.fivemin.list = response.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insert() {
    await this.rest.freeze('Đang thêm...')
    this.rest.check({
      action: 'fivemin-insert',
      time: this.rest.totime(this.rest.fivemin.filter.time),
      // chamsoc: this.rest.fivemin.data.chamsoc,
      // tugiac: this.rest.fivemin.data.tugiac,
      // giaiphap: this.rest.fivemin.data.giaiphap,
      // uytin: this.rest.fivemin.data.uytin,
      // ketqua: this.rest.fivemin.data.ketqua,
      // dongdoi: this.rest.fivemin.data.dongdoi,
      // trachnhiem: this.rest.fivemin.data.trachnhiem,
      // tinhyeu: this.rest.fivemin.data.tinhyeu,
      // hoanthanh: this.rest.fivemin.data.hoanthanh,
    }).then((response) => {
      this.rest.fivemin.list = response.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

}
