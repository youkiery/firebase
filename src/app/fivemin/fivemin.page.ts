import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-fivemin',
  templateUrl: './fivemin.page.html',
  styleUrls: ['./fivemin.page.scss'],
})
export class FiveminPage {
  constructor(
    public rest: RestService
  ) { }

  public async ionViewWillEnter() {
    if (!this.rest.fivemin.init) {
      this.filter().then(() => {
        this.rest.fivemin.init = true
      }, () => {})
//       this.rest.fivemin.list = [
//         {
//           id: 1, chamsoc: `abc`, tugiac: `a
// bc`, giaiphap: `a
// b
// c`, uytin: '', ketqua: '', dongdoi: '', trachnhiem: '', tinhyeu: '', hoanthanh: false, thoigianthem: 1622023139179
//         }
//       ]
    }
  }

  public detail(index: number) {
    this.rest.fivemin.index = index
    this.rest.router.navigateByUrl('/fivemin/detail')
  }

  public update(index = 0) {
    if (!index) {
      this.rest.fivemin.data = {
        chamsoc: '',
        tugiac: '',
        giaiphap: '',
        uytin: '',
        ketqua: '',
        dongdoi: '',
        trachnhiem: '',
        tinhyeu: '',
        hoanthanh: ''
      }
    }
    else this.rest.fivemin.data = JSON.parse(JSON.stringify(this.rest.fivemin.list[this.rest.fivemin.index]))
    this.rest.router.navigateByUrl('/fivemin/update')
  }

  public async filter() {
    await this.rest.freeze('Đang lấy dữ liệu')
    return new Promise((resolve, reject) => {
      this.rest.check({
        action: 'fivemin-init',
        time: this.rest.totime(this.rest.fivemin.filter.time)
      }).then((response) => {
        this.rest.fivemin.list = response.list
        this.rest.defreeze()
        resolve(true)
      }, () => {
        this.rest.defreeze()
        reject()
      })
    })
  }
}
