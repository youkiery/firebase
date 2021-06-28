import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public editor = 0
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.rest.vaccine.edit.time.cometime = this.rest.today
    this.rest.vaccine.edit.time.calltime = this.rest.today
  }

  public dismiss() {
    this.modal.dismiss()
  }

  public async suggest(name: string) {
    this.rest.vaccine.suggesttype = name
    this.rest.vaccine.suggest = this.rest.vaccine.edit.customer[name]
    this.rest.vaccine.suggestList = [] 
    this.rest.router.navigateByUrl('/vaccine/suggest')
  }

  public datepicker(name: string) {
    this.rest.vaccine.edit.time[name] = this.rest.isodatetodate(this.rest.vaccine.edit.picker[name])
  }

  public clear() {
    this.rest.vaccine.edit.customer.name = ''
    this.rest.vaccine.edit.customer.phone = ''
    this.rest.vaccine.edit.pets = []
    this.rest.vaccine.edit.pet = 0
    this.editor = 0
  }

  public edit(index: number) {
    this.rest.vaccine.edit.customer.name = this.rest.vaccine.new[index].name
    this.rest.vaccine.edit.customer.phone = this.rest.vaccine.new[index].number
    this.rest.vaccine.disease.forEach((item, i_index) => {
      if (item.name == this.rest.vaccine.new[index].vaccine) this.rest.vaccine.edit.disease = i_index
    })
    
    this.rest.vaccine.edit.picker.calltime = this.rest.datetoisodate(this.rest.vaccine.new[index].calltime)

    this.rest.temp = this.rest.vaccine.new[index]
    this.editor = this.rest.vaccine.new[index].id
  }

  public async update() {
    await this.rest.freeze('Đang thêm tiêm phòng')
    this.rest.check({
      action: 'vaccine-update',
      id: this.editor,
      disease: this.rest.vaccine.disease[this.rest.vaccine.edit.disease].id,
      calltime: this.rest.vaccine.edit.time.calltime
    }).then((response) => {
      this.rest.vaccine.edit.customer.name = ''
      this.rest.vaccine.edit.customer.phone = ''
      this.rest.vaccine.edit.pets = []
      this.rest.vaccine.edit.pet = 0
      this.editor = 0
      this.rest.vaccine.new = response.new
      this.rest.notify('Đã cập nhật lịch tiêm vaccine')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async save() {
    if (!this.rest.vaccine.edit.customer.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.vaccine.edit.customer.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang thêm tiêm phòng')
      this.rest.check({
        action: 'vaccine-insert',
        customer: this.rest.vaccine.edit.customer.name,
        phone: this.rest.vaccine.edit.customer.phone,
        pet: this.rest.vaccine.edit.pet,
        disease: this.rest.vaccine.disease[this.rest.vaccine.edit.disease].id,
        cometime: this.rest.vaccine.edit.time.cometime,
        calltime: this.rest.vaccine.edit.time.calltime
      }).then((response) => {
        this.rest.vaccine.edit.customer.name = ''
        this.rest.vaccine.edit.customer.phone = ''
        this.rest.vaccine.edit.pets = []
        this.rest.vaccine.edit.pet = 0
        this.rest.vaccine.new = response.new
        this.rest.vaccine.data = response.data
        this.rest.notify('Đã thêm lịch tiêm vaccine')
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    } 
  }
}
