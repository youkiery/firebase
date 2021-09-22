import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class AdminDetail {
  public module = {
    work: 0,
    kaizen: 0,
    schedule: 0,
    vaccine: 0,
    spa: 0,
    expire: 0,
    blood: 0,
    usg: 0,
    drug: 0,
    profile: 0,
    his: 0,
    item: 0,
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
    {name: 'Quản lý sinh hóa', module: 'profile'},
    {name: 'Quản lý lưu bệnh', module: 'his'},
    {name: 'Quản lý hàng hóa', module: 'item'},
  ]
  public level = {
    '-1': '',
    '0': 'Không phận sự',
    '1': 'Nhân viên',
    '2': 'Quản lý',
    '3': ''
  }
  @Input('username') username: string;
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { 
  }
  
  ionViewWillEnter() {
    this.module = this.rest.admin.users[this.rest.admin.index].module
  }

  public async save() {
    await this.rest.freeze('Đang lưu dữ liệu')
    this.rest.checkpost('admin-save', {
      'module': {
        'work': this.module.work,
        'kaizen': this.module.kaizen,
        'schedule': this.module.schedule,
        'vaccine': this.module.vaccine,
        'spa': this.module.spa,
        'expire': this.module.expire,
        'blood': this.module.blood,
        'usg': this.module.usg,
        'drug': this.module.drug,
        'profile': this.module.profile,
        'his': this.module.his,
        'item': this.module.item,
      },
      'id': this.rest.admin.users[this.rest.admin.index].userid
    }).then(response => {
      this.rest.admin.users[this.rest.admin.index].module = response.data
      this.rest.config = response.config
      this.rest.defreeze()
      this.modal.dismiss()
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(module: number, increase: number) {
    this.module[module] = Number(this.module[module]) + increase
    if (this.module[module] < 0) this.module[module] = 0
    else if (this.module[module] > 2) this.module[module] = 2
  }
}
