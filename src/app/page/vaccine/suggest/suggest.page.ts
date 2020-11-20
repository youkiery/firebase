import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage implements OnInit {
  timeout = null
  @ViewChild('input') input;
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

  public select(name: string, phone: string, pet: string) {
    this.rest.vaccine.select = {
      name: name,
      phone: phone,
      pet: pet
    } 
    this.rest.navCtrl.pop()
  }
}
