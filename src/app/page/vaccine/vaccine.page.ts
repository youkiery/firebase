import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ionViewDidEnter() {
    this.rest.freeze('va', 'Đang tải danh sách')
    this.filter().then(data => {
      this.rest.defreeze('va')
    })
  }
  
  public filter() {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'vaccine-auto',
      }).then(response => {
        response.data.forEach((item: any, index: number) => {
          response.data[index]['calltime'] = this.rest.parseDate(response.data[index]['calltime'])
        });
        this.rest.vaccine.data = response.data
        resolve()
      }, () => {
        resolve()
      })
    })
  }

  public filterM() {

  }

  public changeStatus(id: number) {
    this.rest.freeze('Đang thay đổi trạng thái', 'cs')
    this.rest.check({
      action: 'vaccine-auto',
      id: id
    }).then(response => {
      this.rest.vaccine.data = response.data
      this.rest.defreeze('cs')
    }, () => {
      this.rest.defreeze('cs')
    })
  }
  
  ngOnInit() {}

}
