import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public save() {
    this.rest.check({
      action: 'usg-filter',
      keyword: this.rest.usg.filterKey
    }).then((response) => {
      this.rest.usg.data = response.data 
      this.rest.navCtrl.pop()
    })
  }
}
