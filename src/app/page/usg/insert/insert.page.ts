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
  public number: number = 0
  public pet: number
  public note: string = ''
  public pets = []
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
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.time.cometime = this.rest.today
    this.time.calltime = this.rest.today
    if (this.rest.usg.select.name.length) {
      this.customer.name = this.rest.usg.select.name
      this.customer.phone = this.rest.usg.select.phone
      this.pets = JSON.parse(this.rest.usg.select.pet)
      this.pet = this.pets[0].id
    }
    this.rest.usg.select.name = ''
  }

  public clear() {
    this.customer.name = ''
    this.customer.phone = ''
    this.pets = []
    this.pet = 0
    this.number = 0
    this.editor = 0
  }

  public edit(index: number) {
    this.customer.name = this.rest.usg.new[index].name
    this.customer.phone = this.rest.usg.new[index].number
    this.number = this.rest.usg.new[index].birth
    
    this.picker.calltime = this.rest.datetoisodate(this.rest.usg.new[index].calltime)

    this.rest.temp = this.rest.usg.new[index]
    this.editor = this.rest.usg.new[index].id
  }

  public async update() {
    await this.rest.freeze('Đang thêm tiêm phòng')
    this.rest.check({
      action: 'usg-update',
      id: this.editor,
      number: this.number,
      calltime: this.time.calltime,
    }).then((response) => {
      this.clear()
      this.rest.usg.new = response.new
      this.rest.notify('Đã cập nhật lịch siêu âm')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async suggest(name: string) {
    this.rest.usg.suggest = this.customer[name]
    this.rest.usg.suggestList = [] 
    this.rest.router.navigateByUrl('/usg/suggest')
  }

  public datepicker(name: string) {
    this.time[name] = this.rest.isodatetodate(this.picker[name])
  }

  public async save() {
    if (!this.customer.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.customer.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang thêm tiêm phòng')
      this.rest.check({
        action: 'usg-insert',
        customer: this.customer.name,
        phone: this.customer.phone,
        pet: this.pet,
        number: this.number,
        cometime: this.time.cometime,
        calltime: this.time.calltime,
        keyword: this.rest.usg.filterKey,
        status: this.rest.usg.status,
        note: this.note
      }).then((response) => {
        this.clear()
        this.rest.usg.new = response.new
        this.rest.usg.data = response.data
        this.rest.notify('Đã thêm lịch siêu âm')
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    } 
  }
}
