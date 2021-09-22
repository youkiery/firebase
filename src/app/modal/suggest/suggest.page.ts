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
  @ViewChild('input2') input2: any;
  constructor (
    public rest: RestService
  ) {}

  ionViewDidEnter() {
    if (this.rest.action == 'item') this.input2.setFocus();
    else this.input.setFocus();
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
    if (this.rest.temp.param) this.rest.temp.phone2 = this.key
    else this.rest.temp.phone = this.key
    this.rest.navCtrl.pop()
  } 

  public select(i: number) {
    if (this.rest.temp.param) {
      this.rest.temp.name2 = this.list[i].name
      this.rest.temp.phone2 = this.list[i].phone
    }
    else {
      this.rest.temp.name = this.list[i].name
      this.rest.temp.phone = this.list[i].phone
    }
    
    if (this.rest.temp.petlist) {
      this.rest.temp.petlist = this.list[i].petlist
      if (this.list[i].petlist[0]) this.rest.temp.pet = this.list[i].petlist[0].id
    }
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

  public selectItem(name:string, code: string) {
    this.rest.temp.name = name
    this.rest.temp.code = code
    this.rest.navCtrl.pop()
  }
}