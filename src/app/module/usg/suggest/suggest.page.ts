import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage implements OnInit {
  timeout = null
  @ViewChild('input') input: any;
  constructor (
    public rest: RestService
  ) {}

  ngOnInit() { }

  ionViewDidEnter() {
    this.input.setFocus();
  }
    
  public suggest() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.rest.check({
        action: 'usg-suggest',
        value: this.rest.usg.suggest
      }).then((response) => {
        this.rest.usg.suggestList = response.data
      }, () => {
        this.rest.usg.suggestList = []
      })
    }, 300);
  }

  public async pick() {
    this.rest.usg.edit.customer[this.rest.usg.suggesttype] = this.rest.usg.suggest
    this.rest.usg.edit.pets = []
    this.rest.usg.edit.pet = 0
    this.rest.navCtrl.pop()
  }

  public select(name: string, phone: string, pet: any[]) {
    this.rest.usg.edit.customer.name = name
    this.rest.usg.edit.customer.phone = phone
    this.rest.usg.edit.pets = pet
    this.rest.usg.edit.pet = pet[0].id
    this.rest.navCtrl.pop()
  }
}
