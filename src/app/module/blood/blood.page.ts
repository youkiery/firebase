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
    if (this.rest.config.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.blood.edit = {
        number: 1,
        start: this.rest.blood.total,
        end: this.rest.blood.total - 1,
        target: ''
      }
      this.rest.router.navigateByUrl('/blood/insert')
    }
  }

  public import() {
    if (this.rest.config.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.router.navigateByUrl('/blood/in')
    }
  }

  public statistic() {
    if (this.rest.config.blood < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      this.rest.router.navigateByUrl('/blood/statistic')
    }
  }

  public async ionViewDidEnter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.check({
      action: 'blood-init',
      page: this.rest.blood.page
    }).then(response => {
      this.rest.blood.list = response.list
      this.rest.blood.init = 1
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
    this.rest.blood.page++
    this.filter().then(() => {
      event.target.complete();
    })
  }
}
