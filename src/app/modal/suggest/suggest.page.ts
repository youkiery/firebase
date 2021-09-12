import { Component, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage {
  key: string = ''
  list: any = []
  timeout = null
  @ViewChild('input') input: any;
  constructor (
    public rest: RestService
  ) {}

  ionViewDidEnter() {
    this.input.setFocus();
  }
    
  public suggest() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.key.length < 1) this.list = []
      else {
        this.rest.checkpost('customer-search', {
          key: this.key
        }).then((resp) => {
          this.list = resp.list
        }, () => { })
      }
    }, 300);
  }

  public selectcurrent() {
    this.rest.temp.phone = this.key
    this.rest.navCtrl.pop()
  } 

  public select(name:string, phone: string) {
    this.rest.temp.name = name
    this.rest.temp.phone = phone
    this.rest.navCtrl.pop()
  }
    
  public suggestItem() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (this.key.length < 1) this.list = []
      else {
        this.rest.checkpost('item-search', {
          key: this.key
        }).then((resp) => {
          this.list = resp.list
        }, () => { })
      }
    }, 300);
  }

  public selectcurrentItem() {
    this.rest.temp.name = this.key
    this.rest.navCtrl.pop()
  } 

  public selectItem(name:string) {
    this.rest.temp.name = name
    this.rest.navCtrl.pop()
  }
}