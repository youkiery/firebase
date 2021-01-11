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

  public select(name: string, phone: string, pet: string) {
    this.rest.usg.select = {
      name: name,
      phone: phone,
      pet: pet
    } 
    this.rest.navCtrl.pop()
  }
}
