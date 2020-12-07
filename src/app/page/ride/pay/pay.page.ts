import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public save() {
    this.rest.freeze('ri', 'Thêm phiếu...')
    this.rest.check({
      action: 'ride-insert',
      type: 1,
      amount: this.rest.ride.edit.amount,
      note: this.rest.ride.edit.note,
    }).then(response => {
      this.rest.defreeze('ri')
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze('ri')
    })
  }
}
