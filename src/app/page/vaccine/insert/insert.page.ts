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
  public pet: number
  public pets = []
  public disease: number = 0
  public time = {
    cometime: '', 
    calltime: ''
  }
  public picker = {
    cometime: '',
    calltime: ''
  }
  public editor = 0
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.time.cometime = this.rest.today
    this.time.calltime = this.rest.today
    if (this.rest.vaccine.select.name.length) {
      this.customer.name = this.rest.vaccine.select.name
      this.customer.phone = this.rest.vaccine.select.phone
      this.pets = JSON.parse(this.rest.vaccine.select.pet)
      this.pet = this.pets[0].id
    }
    this.rest.vaccine.select.name = ''
  }

  public dismiss() {
    this.modal.dismiss()
  }

  public async suggest(name: string) {
    this.rest.vaccine.suggest = this.customer[name]
    this.rest.vaccine.suggestList = [] 
    this.rest.router.navigateByUrl('/vaccine/suggest')
  }

  public datepicker(name: string) {
    this.time[name] = this.rest.isodatetodate(this.picker[name])
  }

  public clear() {
    this.customer.name = ''
    this.customer.phone = ''
    this.pets = []
    this.pet = 0
    this.editor = 0
  }

  public edit(index: number) {
    this.customer.name = this.rest.vaccine.new[index].name
    this.customer.phone = this.rest.vaccine.new[index].number
    this.rest.vaccine.disease.forEach((item, i_index) => {
      if (item.name == this.rest.vaccine.new[index].vaccine) this.disease = i_index
    })
    
    this.picker.calltime = this.rest.datetoisodate(this.rest.vaccine.new[index].calltime)

    this.rest.temp = this.rest.vaccine.new[index]
    this.editor = this.rest.vaccine.new[index].id
  }

  public async update() {
    await this.rest.freeze('Đang thêm tiêm phòng')
    this.rest.check({
      action: 'vaccine-update',
      id: this.editor,
      disease: this.rest.vaccine.disease[this.disease].id,
      calltime: this.time.calltime
    }).then((response) => {
      this.customer.name = ''
      this.customer.phone = ''
      this.pets = []
      this.pet = 0
      this.editor = 0
      this.rest.vaccine.new = response.new
      this.rest.notify('Đã cập nhật lịch tiêm vaccine')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
  
  public async save() {
    if (!this.customer.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.customer.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang thêm tiêm phòng')
      this.rest.check({
        action: 'vaccine-insert',
        customer: this.customer.name,
        phone: this.customer.phone,
        pet: this.pet,
        disease: this.rest.vaccine.disease[this.disease].id,
        cometime: this.time.cometime,
        calltime: this.time.calltime
      }).then((response) => {
        this.customer.name = ''
        this.customer.phone = ''
        this.pets = []
        this.pet = 0
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
