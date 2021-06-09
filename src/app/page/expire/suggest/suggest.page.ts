import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage implements OnInit {
  timeout = null
  name: string = ''
  @ViewChild('input') input: any;
  constructor(
    public rest: RestService
  ) { 
    this.name = this.rest.expire.edit.name
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.input.setFocus();
  }

  public suggest() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.rest.check({
        action: 'expire-suggest',
        name: this.name
      }).then((response) => {
        this.rest.expire.suggestList = response.data
      }, () => {
        this.rest.expire.suggestList = []
      })
    }, 300);
  }

  public select(id: number, name: string) {
    this.rest.expire.edit.rid = id
    this.rest.expire.edit.name = name
    this.rest.navCtrl.pop()
  }

  public async pick() {
    await this.rest.freeze('Xin đợi một chút')
    this.rest.check({
      action: 'expire-pick',
      name: this.name
    }).then(response => {
      this.rest.expire.edit.rid = response.id
      this.rest.expire.edit.name = this.name
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }
} 
