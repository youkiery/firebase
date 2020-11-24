import { Element } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
        action: 'spa-suggest',
        value: this.rest.spa.suggest
      }).then((response) => {
        this.rest.spa.suggestList = response.data
      }, () => {
        this.rest.spa.suggestList = []
      })
    }, 300);
  }

  public select(name: string, phone: string) {
    this.rest.spa.select = {
      name: name,
      phone: phone
    } 
    this.rest.navCtrl.pop()
  }
}
