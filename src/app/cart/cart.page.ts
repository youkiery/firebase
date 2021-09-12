import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  public text = ''
  constructor(
    public rest: RestService,
  ) {
    // this.push.rx.notification().subscribe((msg) => {
    //   this.text = 'Chỗ trống đã thêm vào'
    // });
  }

  async ionViewWillEnter() {
    if (!this.rest.cart.init) {
      await this.rest.freeze()
      this.rest.checkpost('cart-init', {}).then(resp => {
        this.rest.cart.list = resp.list
        this.rest.cart.init = true
        this.rest.defreeze()
        // this.push.register().then((t: PushToken) => {
        //   return this.push.saveToken(t);
        // }).then((t: PushToken) => { })
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public detail(index: number) {
    this.rest.cart.select = index
    this.rest.navCtrl.navigateForward('/cart/detail')
  }
}
