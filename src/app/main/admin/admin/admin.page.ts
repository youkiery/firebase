import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public key: string = ''
  public list = []
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  public async insert(id: number) {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('admin-insert', {
      id: id,
      key: this.key
    }).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
      this.rest.notify(resp.messenger)
    }, () => {
      this.rest.defreeze()
    })
  }

  public async filter() {
    await this.rest.freeze('Đang lọc...')
    this.rest.checkpost('admin-filter', {
      key: this.key
    }).then(resp => {
      this.rest.defreeze()
      this.list = resp.list
    }, () => {
      this.rest.defreeze()
    })
  }
}
