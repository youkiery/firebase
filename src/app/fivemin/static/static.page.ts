import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.page.html',
  styleUrls: ['./static.page.scss'],
})
export class StaticPage implements OnInit {
  public list = {}
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public async ionViewWillEnter() {
    if (!this.rest.fivemin.init2) {
      this.filter().then(() => {
        this.rest.fivemin.init2 = true
      }, () => {})
    }
  }

  public filterButton() {
    this.rest.fivemin.filter.page = 1
    this.rest.fivemin.list = []
    this.rest.fivemin.thongke.dulieu = []
    this.filter()
  }

  public async previewSelected() {
    if (Object.keys(this.list).length) {
      await this.rest.freeze('Đang lấy dữ liệu...')
      let list = []
      for (const key in this.list) {
        if (Object.prototype.hasOwnProperty.call(this.list, key)) {
          list.push(key)       
        }
      }
      this.rest.check({
        action: 'fivemin-previewed',
        id: list.join(','),
        start: this.rest.isodatetotime(this.rest.fivemin.filter.start),
        end: this.rest.isodatetotime(this.rest.fivemin.filter.end)
      }).then(response => {
        this.rest.fivemin.html = response.html
        this.rest.router.navigateByUrl('/fivemin/preview')
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }
  
  public async hoanthanh(id: number) {
    await this.rest.freeze('Đang lấy dữ liệu...')
    this.rest.check({
      action: 'fivemin-hoanthanh',
      id: id,
      page: this.rest.fivemin.filter.page,
      start: this.rest.isodatetotime(this.rest.fivemin.filter.start),
      end: this.rest.isodatetotime(this.rest.fivemin.filter.end)
    }).then(response => {
      this.rest.defreeze()
      this.rest.fivemin.thongke.danhsach = response.list
      this.rest.router.navigateByUrl('fivemin/statistic')
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang lấy dữ liệu...')
    return new Promise((resolve, reject) => {
      this.rest.check({
        action: 'fivemin-statistic',
        page: this.rest.fivemin.filter.page,
        start: this.rest.isodatetotime(this.rest.fivemin.filter.start),
        end: this.rest.isodatetotime(this.rest.fivemin.filter.end)
      }).then((response) => {
        this.rest.fivemin.thongke.dulieu = this.rest.fivemin.thongke.dulieu.concat(response.list)
        this.rest.defreeze()
        resolve(true)
      }, () => {
        this.rest.defreeze()
        reject()
      })
    })
  }
}
