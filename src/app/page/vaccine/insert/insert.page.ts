import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  template: `
    <ion-item>
      <ion-label position="stack"> {{tilte[rest.vaccine.suggest]}} <ion-label>
    </ion-item>
  `
})
export class SuggestComponent {
  title = {
    'name': 'Khách hàng',
    'phone': 'Số điện thoại'
  }
  timeout: any
  value: string
  suggest_item = []
  constructor (
    public rest: RestService
  ) {}

  public suggest(name: string) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.rest.check({
        action: 'vaccine-suggest',
        type: name,
        value: this.value
      }).then((response) => {
        this.suggest_item = response.data
      }, () => {

      })
    }, 300);
  }
}


@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public customer = {
    name: '',
    phone: ''
  }
  public pet: number
  public disease: number
  public time = {
    cometime: '', 
    calltime: ''
  }
  public picker = {
    cometime: '',
    calltime: ''
  }
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  public dismiss() {
    this.modal.dismiss()
  }

  public async suggest(name: string) {
    this.rest.vaccine.suggest = name
    let modal = await this.modal.create({
      component: SuggestComponent
    })
    modal.present()
  }

  public datepicker(name: string) {
    let datetime = this.rest.parseDate(this.picker[name])
    this.time[name] = datetime.datestring
  }

  public save() {
    this.rest.freeze('Đang thêm tiêm phòng', 'iv')
    this.rest.check({
      action: 'vaccine-insert',
      customer: this.customer.name,
      phone: this.customer.phone,
      pet: this.pet,
      disease: this.disease,
      cometime: this.time.cometime,
      calltime: this.time.calltime
    }).then((response) => {
      this.rest.vaccine.data = response.data
      this.rest.defreeze('iv')
    }, () => {
      this.rest.defreeze('iv')
    })
  }
}
