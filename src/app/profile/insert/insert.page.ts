import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertProfile implements OnInit {
  public phone = ''
  public customer = ''
  public address = ''
  public name = ''
  public weight = 1
  public age = 1
  public gender = '0'
  public type = 0
  public serial = 0
  public sampletype = 0
  public samplenumber = 1
  public samplesymbol = ''
  public samplestatus = '1'
  public doctor = ''
  public symptom = ''
  public target = {}
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController
  ) { }

  ngOnInit() {
    console.log(this.rest);
    
    this.serial = this.rest.profile.serial
  }

  ionViewDidEnter() {
    if (this.rest.profile.suggest.select.phone.length) {
      if (this.rest.profile.suggest.select.customer.length) this.customer = this.rest.profile.suggest.select.customer
      if (this.rest.profile.suggest.select.address.length) this.address = this.rest.profile.suggest.select.address
      this.phone = this.rest.profile.suggest.select.phone
    }
  }

  public log() {
    console.log(this.target)
  }

  public insert() {
    let msg = ''
    if (!this.customer.length) msg = 'Chưa điền tên chủ'
    else if (!this.phone.length) msg = 'Chưa điền số điện thoại'
    else if (!this.name.length) msg = 'Chưa điền tên vật nuôi'
    else if (!this.type) msg = 'Chưa chọn loài'
    else if (!this.sampletype) msg = 'Chưa chọn loại mẫu'
    else if (!this.samplesymbol) msg = 'Chưa nhập ký hiệu mẫu'
    if (msg.length) {
      this.rest.notify(msg)
      return 0
    }

    if (!this.weight.toString().length) this.weight = 0
    if (!this.age.toString().length) this.age = 0
    if (!this.samplenumber.toString().length || this.samplenumber < 1) this.samplenumber = 1

    let data = {
      action: 'profile-insert',
      customer: this.customer,
      phone: this.phone,
      address: this.address,
      name: this.name,
      weight: this.weight,
      age: this.age,
      gender: this.gender,
      type: this.type,
      serial: this.serial,
      sampletype: this.sampletype,
      samplenumber: this.samplenumber,
      samplesymbol: this.samplesymbol,
      samplestatus: this.samplestatus,
      doctor: this.doctor,
      symptom: this.symptom
    }
    this.rest.target.list.forEach(target => {
      if (!this.target[target.id]) this.target[target.id] = 0
      data[target.id] = this.target[target.id]
    });
    
    this.rest.check(data).then(response => {
      let data = [response.data]
      this.rest.profile.list = data.concat(this.rest.profile.list)
      this.rest.profile.serial = response.serail
      this.rest.navCtrl.pop()
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public async suggest() {
    this.rest.profile.suggest.key = ''
    this.rest.profile.suggest.select = {
      customer: '',
      phone: '',
      address: ''
    }
    this.rest.profile.suggest.list = [] 
    this.rest.router.navigateByUrl('/profile/suggest')
  }

  public async insertSelect(type: string) {
    const alert = await this.alert.create({
      header: 'Thêm gợi ý',
      inputs: [{
        type: 'text',
        name: 'name',
      }],
      buttons: [{
        text: 'Trở về',
        role: 'cancel',
      }, {
        text: 'Xác nhận',
        cssClass: 'primary',
        handler: (e) => {
          this.rest.freeze('cs', 'Đang thêm...')
          this.rest.check({
            action: 'profile-suggest-insert',
            type: type,
            name: e['name'],
          }).then(response => {
            this.rest.profile[type] = response.list
            this.rest.notify('Đã thêm')
            this.rest.defreeze('cs')
          }, () => {
            this.rest.defreeze('cs')
          })
        }
      }]
    });

    alert.present();
  }

  public async insertTarget() {
      const alert = await this.alert.create({
        header: 'Thêm chỉ tiêu',
        inputs: [
          {
            type: 'text',
            name: 'name',
            placeholder: 'Tên chỉ tiêu'
          }
        ],
        buttons: [
          {
            text: 'Trở về',
            role: 'cancel',
            cssClass: 'default'
          }, {
            text: 'Xác nhận',
            cssClass: 'primary',
            handler: (e) => {
              this.rest.freeze('cs', 'Đang thêm chỉ tiêu...')
              this.rest.check({
                action: 'target-insert',
                name: e['name'],
              }).then(response => {
                this.rest.notify('Đã thêm chỉ tiêu')
                this.rest.target.list = response.list
                this.rest.target.list = response.list
                this.rest.defreeze('cs')
              }, () => {
                this.rest.defreeze('cs')
              })
            }
          }
        ]
      });

      await alert.present();
  }
}
