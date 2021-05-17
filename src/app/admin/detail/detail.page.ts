import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class AdminDetail {
  public module = {
    work: false,
    kaizen: false,
    schedule: false,
    vaccine: false,
    spa: false,
    expire: false,
    blood: false,
    usg: false,
    drug: false,
    target: false,
  }
  public list = [
    {name: 'Quản lý công việc', module: 'work'},
    {name: 'Kaizen', module: 'kaizen'},
    {name: 'Đăng ký lịch', module: 'schedule'},
    {name: 'Quản lý vaccine', module: 'vaccine'},
    {name: 'Lịch spa', module: 'spa'},
    {name: 'Quản lý hạn', module: 'expire'},
    {name: 'Quản lý xét nghiệm', module: 'blood'},
    {name: 'Quản lý siêu âm', module: 'usg'},
    {name: 'Tra cứu thuốc', module: 'drug'},
    {name: 'Hóa chất xét nghiệm', module: 'target'}
  ]
  public level = {
    '-1': '',
    '0': 'Không phận sự',
    '1': 'Nhân viên',
    '2': 'Quản lý',
    '3': ''
  }
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { 
  }
  
  ionViewWillEnter() {
    this.module = this.rest.admin.users[this.rest.admin.index].module
  }

  public save() {
    this.rest.check({
      action: 'admin-save',
      'work': this.module.work,
      'kaizen': this.module.kaizen,
      'schedule': this.module.schedule,
      'vaccine': this.module.vaccine,
      'spa': this.module.spa,
      'expire': this.module.expire,
      'blood': this.module.blood,
      'usg': this.module.usg,
      'drug': this.module.drug,
      'target': this.module.target,
      'id': this.rest.admin.users[this.rest.admin.index].userid
    }).then(response => {
      this.rest.admin.users[this.rest.admin.index].module = response.data
      this.modal.dismiss()
    }, () => {

    })
  }

  public change(module: number, increase: number) {
    this.module[module] = Number(this.module[module]) + increase
    if (this.module[module] < 0) this.module[module] = 0
    else if (this.module[module] > 2) this.module[module] = 2
  }
}
