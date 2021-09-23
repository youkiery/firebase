import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
  public insult = {
    0: 'stl-card yellow',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public filter = {
    from: null,
    end: null,
  } 
  public data = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.filter = JSON.parse(JSON.stringify(this.rest.his.filter))
    this.statistic()
  }

  public async statistic() {
    await this.rest.freeze('Đang tải dữ liệu...')
    this.rest.checkpost('his-statistic', {
      filter: this.filter
    }).then((resp) => {
      this.data = resp.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
