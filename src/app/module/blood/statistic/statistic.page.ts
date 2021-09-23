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

  public async ionViewDidEnter() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.check({
      'action': 'blood-statistic'
    }).then(response => {
      this.rest.blood.statistic = response.statistic
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
