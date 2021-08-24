import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {
  public status = {
    'wc-completed': 'Hoàn Thành',
    'wc-processing': 'Chờ xử lý',
    'wc-onhold': 'Tạm giữ'
  }
  constructor(
    public rest: RestService
  ) { }

  public async change(status: string = 'wc-processing') {
    await this.rest.freeze()
    this.rest.checkpost('cart-change', {
      id: this.rest.cart.list[this.rest.cart.select].id,
      status: status
    }).then(() => {
      if (status == 'wp-complete') {
        this.rest.navCtrl.pop()
        this.rest.cart.list = this.rest.cart.list.filter((item, index) => {
          return index !== this.rest.cart.select
        })
      }
      else this.rest.cart.list[this.rest.cart.select].status = this.status[status]
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  } 
}
