import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public update() {
    this.rest.check({
      action: 'target-update-info',
      id: this.rest.profile.data2.id,
      name: this.rest.profile.data2.name,
      intro: encodeURI(this.rest.profile.data2.intro),
      unit: this.rest.profile.data2.unit,
      flag: this.rest.profile.data2.flag,
      up: encodeURI(this.rest.profile.data2.up),
      down: encodeURI(this.rest.profile.data2.down),
      disease: encodeURI(this.rest.profile.data2.disease),
      aim: encodeURI(this.rest.profile.data2.aim),
      key: this.rest.profile.filter.key
    }).then(response => {
      this.rest.profile.target = response.list
      this.rest.notify('Đã cập nhật thông tin')
      // this.rest.navCtrl.pop()
    }, () => { })
  }

  public insert() {
    this.rest.check({
      action: 'target-insert',
      name: this.rest.profile.data2.name,
      intro: encodeURI(this.rest.profile.data2.intro),
      unit: this.rest.profile.data2.unit,
      flag: this.rest.profile.data2.flag,
      up: encodeURI(this.rest.profile.data2.up),
      down: encodeURI(this.rest.profile.data2.down),
      disease: encodeURI(this.rest.profile.data2.disease),
      aim: encodeURI(this.rest.profile.data2.aim),
      key: this.rest.profile.filter.key
    }).then(response => {
      this.rest.profile.target = response.list
      this.rest.navCtrl.pop()
    }, () => { })
  }


}
