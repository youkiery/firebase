import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }

  public changeNumber() {
    this.rest.blood.edit.start = this.rest.blood.total
    this.rest.blood.edit.end = this.rest.blood.total - this.rest.blood.edit.number
  }

  public async save() {
    await this.rest.freeze('Đang thêm phiếu nhập...')
    this.rest.check({
      'action': 'blood-insert',
      'number': this.rest.blood.edit.number,
      'target': this.rest.blood.edit.target,
    }).then(response => {
      this.rest.blood.edit.number = 1
      this.rest.blood.total = Number(response.number)
      this.rest.blood.edit.start = this.rest.blood.total
      this.rest.blood.edit.end = this.rest.blood.total - 1
      this.rest.blood.edit.target = ''
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
