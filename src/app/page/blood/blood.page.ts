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
    this.rest.router.navigateByUrl('/blood/in')
  }

  public statistic() {
    this.rest.router.navigateByUrl('/blood/statistic')
  }

  ionViewDidEnter() {
    this.rest.freeze('auto', 'Đang tải danh sách...')
    if (this.rest.blood.init) this.filter()
    else {
      this.rest.check({
        action: 'blood-init',
        page: this.rest.blood.page
      }).then(response => {
        this.rest.blood.list = response.list
        this.rest.blood.init = 1
      }, () => {
      })
    }
  }

  public filter() {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'blood-auto',
        page: this.rest.blood.page
      }).then(response => {
        if (response.list) this.rest.blood.list = this.rest.blood.list.concat(response.list)
        resolve('')
      }, () => {
        resolve('')
      })
    })
  }

  public loadData(event) {
    this.rest.blood.page ++
    this.filter().then(() => {
      event.target.complete();
    })
  }
}
