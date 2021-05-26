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

  public async filter() {
    await this.rest.freeze('Đang lấy danh sách')
    this.rest.check({
      action: 'expire-auto',
      fname: this.rest.expire.filter.name,
      ftime: this.rest.expire.filter.time
    }).then(response => {
      this.rest.expire.list = response.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, (e) => {
      this.rest.defreeze()
    })
  }
}
