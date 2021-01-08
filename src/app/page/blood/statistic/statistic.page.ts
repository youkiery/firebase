import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {

  constructor(
    public rest: RestService
  ) {  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.rest.check({
      'action': 'blood-statistic'
    }).then(response => {
      this.rest.blood.statistic = response.statistic
    })
  }
}
