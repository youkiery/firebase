import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-col',
  templateUrl: './col.page.html',
  styleUrls: ['./col.page.scss'],
})
export class ColPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {}

  public save() {
    this.rest.freeze('ri', 'Thêm phiếu...')
    this.rest.check({
      action: 'ride-insert',
      type: 0,
      doctorid: this.rest.ride.edit.doctorid,
      from: this.rest.ride.edit.from,
      end: this.rest.ride.edit.end,
      amount: this.rest.ride.edit.amount,
      destination: this.rest.ride.edit.destination,
      note: this.rest.ride.edit.note,
    }).then(response => {
      this.rest.ride.edit['doctorid']  = ''
      this.rest.ride.edit['from']  = ''
      this.rest.ride.edit['end']  = ''
      this.rest.ride.edit['destination']  = ''
      this.rest.ride.edit['note']  = ''
      this.rest.defreeze('ri')
    }, () => {
      this.rest.defreeze('ri')
    })
  }
}
