import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertProfile implements OnInit {
  public customer = ''
  public address = ''
  public name = ''
  public weight = ''
  public age = ''
  public gender = '0'
  public type = 0
  public sampleid = ''
  public serial = 0
  public sampletype = 0
  public samplenumber = ''
  public samplesymbol = ''
  public samplestatus = 1
  public doctor = ''
  public time = ''
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

  public log() {
    console.log(this.target)
  }

  public insert() {
    let data = {
      action: 'profile-insert',
      customer: this.customer,
      sampleid: this.sampleid,
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
      doctor: this.doctor
    }
    this.rest.target.list.forEach(target => {
      if (!this.target[target.id]) this.target[target.id] = 0
      data[target.id] = this.target[target.id]
    });
    
    this.rest.check(data).then(response => {
      let data = [response.data]
      this.rest.profile.list = data.concat(this.rest.profile.list)
      this.rest.profile.serial = response.serail
      this.modal.dismiss()
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
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
