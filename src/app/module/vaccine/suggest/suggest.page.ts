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
        action: 'vaccine-suggest',
        value: this.rest.vaccine.suggest
      }).then((response) => {
        this.rest.vaccine.suggestList = response.data
      }, () => {
        this.rest.vaccine.suggestList = []
      })
    }, 300);
  }

  public async pick() {
    this.rest.vaccine.edit.customer[this.rest.vaccine.suggesttype] = this.rest.vaccine.suggest
    this.rest.vaccine.edit.pets = []
    this.rest.vaccine.edit.pet = 0
    this.rest.navCtrl.pop()
  }

  public select(name: string, phone: string, pet: any[]) {
    this.rest.vaccine.edit.customer.name = name
    this.rest.vaccine.edit.customer.phone = phone
    this.rest.vaccine.edit.pets = pet
    this.rest.vaccine.edit.pet = pet[0].id
    this.rest.navCtrl.pop()
  }
}
