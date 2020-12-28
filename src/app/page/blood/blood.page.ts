import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-blood',
  templateUrl: './blood.page.html',
  styleUrls: ['./blood.page.scss'],
})
export class BloodPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  public insert() {
    this.rest.blood.edit = {
      number: 1,
      start: this.rest.blood.total,
      end: this.rest.blood.total - 1,
      target: ''
    },
    this.rest.router.navigateByUrl('/blood/insert')
  }

  public import() {
    this.rest.router.navigateByUrl('/blood/import')
  }

  public filter() {
    this.rest.router.navigateByUrl('/blood/filter')
  }

  public statistic() {
    this.rest.router.navigateByUrl('/blood/statistic')
  }

  ionViewDidEnter() {
    this.rest.freeze('auto', 'Đang tải danh sách...')
    this.rest.check({
      action: 'blood-auto'
    }).then(response => {
      this.rest.blood.list = response.list
      this.rest.defreeze('auto')
    }, () => {
      this.rest.defreeze('auto')
    })
  }
}
