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
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.rest.usg.edit.time.cometime = this.rest.today
    this.rest.usg.edit.time.calltime = this.rest.today
    if (this.rest.usg.select.name.length) {
      this.rest.usg.edit.customer.name = this.rest.usg.select.name
      this.rest.usg.edit.customer.phone = this.rest.usg.select.phone
      this.rest.usg.edit.pets = JSON.parse(this.rest.usg.select.pet)
      this.rest.usg.edit.pet = this.rest.usg.edit.pets[0].id
    }
    this.rest.usg.select.name = ''
  }

  public clear() {
    this.rest.usg.edit.customer.name = ''
    this.rest.usg.edit.customer.phone = ''
    this.rest.usg.edit.pets = []
    this.rest.usg.edit.pet = 0
    this.rest.usg.edit.number = 0
    this.editor = 0
  }

  public edit(index: number) {
    this.rest.usg.edit.customer.name = this.rest.usg.new[index].name
    this.rest.usg.edit.customer.phone = this.rest.usg.new[index].number
    this.rest.usg.edit.number = this.rest.usg.new[index].birth
    
    this.rest.usg.edit.picker.calltime = this.rest.datetoisodate(this.rest.usg.new[index].calltime)

    this.rest.temp = this.rest.usg.new[index]
    this.editor = this.rest.usg.new[index].id
  }

  public async update() {
    await this.rest.freeze('Đang thêm tiêm phòng')
    this.rest.check({
      action: 'usg-update',
      id: this.editor,
      number: this.rest.usg.edit.number,
      calltime: this.rest.usg.edit.time.calltime,
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
    this.rest.usg.suggesttype = name
    this.rest.usg.suggest = this.rest.usg.edit.customer[name]
    this.rest.usg.suggestList = [] 
    this.rest.router.navigateByUrl('/usg/suggest')
  }

  public datepicker(name: string) {
    this.rest.usg.edit.time[name] = this.rest.isodatetodate(this.rest.usg.edit.picker[name])
  }

  public async save() {
    if (!this.rest.usg.edit.customer.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.usg.edit.customer.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      await this.rest.freeze('Đang thêm tiêm phòng')
      this.rest.check({
        action: 'usg-insert',
        customer: this.rest.usg.edit.customer.name,
        phone: this.rest.usg.edit.customer.phone,
        pet: this.rest.usg.edit.pet,
        number: this.rest.usg.edit.number,
        cometime: this.rest.usg.edit.time.cometime,
        calltime: this.rest.usg.edit.time.calltime,
        keyword: this.rest.usg.filterKey,
        status: this.rest.usg.status,
        note: this.rest.usg.edit.note
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
