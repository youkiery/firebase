import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

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
  public note: string = ''
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.rest.spa.select.name.length) {
      this.customer.name = this.rest.spa.select.name
      this.customer.phone = this.rest.spa.select.phone
    }
    this.rest.spa.select.name = ''
  }

  public dismiss() {
    this.modal.dismiss()
  }

  public async suggest(name: string) {
    this.rest.spa.suggest = this.customer[name]
    this.rest.spa.suggestList = [] 
    this.rest.router.navigateByUrl('/spa/suggest')
  }

  public save() {
    if (!this.customer.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.customer.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      this.rest.freeze('iv', 'Đang thêm lịch spa')
      this.rest.check({
        action: 'spa-insert',
        customer: this.customer.name,
        phone: this.customer.phone,
        note: this.note
      }).then(() => {
        this.customer.name = ''
        this.customer.phone = ''
        this.note = ''
        this.rest.notify('Đã thêm lịch spa')
        this.rest.defreeze('iv')
      }, () => {
        this.rest.defreeze('iv')
      })
    } 
  }
}
