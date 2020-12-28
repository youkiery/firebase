import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-out',
  templateUrl: './out.page.html',
  styleUrls: ['./out.page.scss'],
})
export class OutPage implements OnInit {
  number: number = 0
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  public save() {
    this.rest.check({
      action: 'blood-export-chemist',
      number: this.number
    }).then(response => {
      this.rest.blood.number = response.number
      this.rest.blood.edit.start = response.number
      this.rest.blood.edit.end = response.number - this.rest.blood.edit.number
      this.rest.navCtrl.pop()
    })
  }
}
