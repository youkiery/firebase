import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public data = {
    time: ''
  }
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public async save() {
    if (!this.rest.expire.edit.rid) this.rest.notify('Chưa chọn mặt hàng')
    else {
      await this.rest.freeze('Đang thêm hạn sử dụng')
      this.rest.check({
        action: 'expire-insert',
        id: this.rest.expire.edit.id,
        rid: this.rest.expire.edit.rid,
        expire: this.rest.expire.edit.expire,
        number: this.rest.expire.edit.number
      }).then(response => {
        this.rest.expire.edit.name = '' 
        this.rest.expire.edit.id = 0 
        this.rest.expire.edit.rid = 0 
        this.rest.expire.edit.expire = '' 
        this.rest.expire.edit.number = 0 
        this.rest.expire.list = response.list
        this.rest.defreeze()
      }, () => {
       this.rest.defreeze()
      })
    }
  }

  public datepicker() {
    this.rest.expire.edit.expire = this.rest.isodatetodate(this.data.time)
  }

  public suggest() {
    this.rest.router.navigateByUrl('/expire/suggest')
  }
}
