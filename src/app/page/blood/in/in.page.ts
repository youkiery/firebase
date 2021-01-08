import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-in',
  templateUrl: './in.page.html',
  styleUrls: ['./in.page.scss'],
})
export class InPage implements OnInit {
  public number = {
    1: 0, 2: 0, 3: 0
  }
  public total = 0
  constructor(
    public rest: RestService
  ) { 
    this.total = this.rest.blood.total
  }

  ngOnInit() { }

  public save() {
    this.rest.check({
      action: 'blood-import-chemist',
      number1: this.number[1],
      number2: this.number[2],
      number3: this.number[3],
      total: this.total,
    }).then(response => {
      this.rest.blood.number = response.total
      this.rest.blood.total = Number(response.number)
      this.rest.blood.edit.start = this.rest.blood.total
      this.rest.blood.edit.end = this.rest.blood.edit.start - this.rest.blood.edit.number
      this.rest.navCtrl.pop()
    })
  }
}
