import { Component, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage {
  timeout = null
  @ViewChild('input') input: any;
  constructor(
    public rest: RestService
  ) { }


  ionViewDidEnter() {
    this.input.setFocus();
    this.rest.profile.suggest.select.customer = ''
  }
    
  public suggest() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.rest.check({
        action: 'profile-suggest',
        key: this.rest.profile.suggest.key
      }).then((response) => {
        this.rest.profile.suggest.list = response.list
      }, () => {
        this.rest.profile.suggest.list = []
      })
    }, 300);
  }

  public selectThis() {
    this.rest.profile.suggest.select = {
      phone: this.rest.profile.suggest.key,
      customer: '',
      address: ''
    } 
    this.rest.navCtrl.pop()
  }

  public select(name: string, phone: string, address: string) {
    this.rest.profile.suggest.select = {
      customer: name,
      phone: phone,
      address: address
    } 
    this.rest.navCtrl.pop()
  }
}
