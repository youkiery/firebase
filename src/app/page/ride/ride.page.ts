import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
  private page = ['col', 'pay']
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }
  
  ionViewDidEnter() {
    this.rest.freeze('ra', 'Lấy danh sách...')
    this.rest.check({
      action: 'ride-auto',
      type: this.rest.ride.selected
    }).then(response => {
      this.rest.ride.list[this.rest.ride.selected] = response.list
      this.rest.defreeze('ra')
    }, () => {
      this.rest.defreeze('ra')
    })
  }

  public insert() {
    if (this.rest.ride.selected) {
      // pay
      this.rest.ride.edit['amount'] = 0
      this.rest.ride.edit['note'] = ''
    }
    else {
      // col
      this.rest.ride.edit['doctorid']  = ''
      this.rest.ride.edit['from']  = ''
      this.rest.ride.edit['end']  = ''
      this.rest.ride.edit['amount']  = 0
      this.rest.ride.edit['destination']  = ''
      this.rest.ride.edit['note']  = ''
    }
    this.rest.router.navigateByUrl('/ride/' + this.page[this.rest.ride.selected])
  }
}
