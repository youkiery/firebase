import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
    this.rest.freeze('load', 'Tải danh sách...')
    this.rest.check({
      action: 'target-init'
    }).then(response => {
      this.rest.target.list = response.list
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public update(index: number) {
    this.rest.freeze('load', 'Cập nhật...')
    this.rest.check({
      action: 'target-update',
      id: this.rest.target.list[index].id
    }).then(response => {
      this.rest.target.list[index].number += 1
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public reset(index: number) {
    this.rest.freeze('load', 'Cài lại...')
    this.rest.check({
      action: 'target-reset',
      id: this.rest.target.list[index].id
    }).then(response => {
      this.rest.target.list[index].number += 1
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

}
