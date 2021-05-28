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
      await this.rest.freeze('Đang lấy dữ liệu')
      this.rest.fivemin.init = true
      this.rest.fivemin.list = [
        {
          id: 1, chamsoc: `abc`, tugiac: `a
bc`, giaiphap: `a
b
c`, uytin: '', ketqua: '', dongdoi: '', trachnhiem: '', tinhyeu: '', hoanthanh: false, thoigianthem: 1622023139179
        }
      ]
      this.rest.defreeze()
    }
  }

  public detail(index: number) {
    this.rest.fivemin.index = index
    this.rest.router.navigateByUrl('/fivemin/detail')
  }

  public update(status: boolean = false) {
    this.rest.router.navigateByUrl('/fivemin/update')
  }

  public filter() {
    this.rest.router.navigateByUrl('/fivemin/filter')
    // this.rest.check({
    //   action: 'fivemin-filter',
    // })

  }

}
