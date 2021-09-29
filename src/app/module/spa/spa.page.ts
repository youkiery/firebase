import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TimeService } from 'src/app/services/time.service';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-spa',
  templateUrl: './spa.page.html',
  styleUrls: ['./spa.page.scss'],
})
export class SpaPage {
  interval = null
  checked = false
  public status = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card yellow',
    3: 'stl-card red',
  }
  public status_text = {
    0: 'Chưa xong',
    1: 'Đã xong',
    2: 'Đã gọi',
    3: 'Đã về'
  }
  public weight = ['< 2kg', '2 - 4kg', '4 - 10kg', '10 - 15kg', '15 - 25kg', '25 - 35kg', '35 - 50kg', '> 50kg']
  public autoload = null
  public check = true
  public keyword = ''
  public option = []
  
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
    public modal: ModalController
  ) { }

  async ionViewDidEnter() {
    this.autoload = setInterval(() => {
      if (this.rest.spa.init) this.auto()
    }, 15000)
    if (!this.rest.spa.init) {
      this.rest.spa.time = (new Date()).getTime()
      this.init()
    }
  }

  ionViewWillLeave() {
    clearInterval(this.autoload)
  }

  public async init() {
    this.check = false
    this.rest.checkpost('spa-init', {
      time: this.rest.spa.time,
    }).then((resp) => {
      this.check = true
      this.rest.spa.init = new Date().getTime()
      this.rest.spa.list = resp.list
      this.rest.spa.type = resp.type
      this.rest.spa.doctor = resp.doctor
      this.rest.spa.init = resp.time
      this.rest.spa.doctor.forEach(item => {
        this.option.push({
          name: 'userid',
          type: 'radio',
          label: item.name,
          value: item.userid,
          checked: (this.rest.user.userid == item.userid ? true : false)
        })
      });
    }, () => { })
  }

  public async auto() {
    if (this.check) {
      this.check = false
      this.rest.checkpost('spa-auto', {
        time: this.rest.spa.time,
        ctime: this.rest.spa.init
      }).then((resp) => {
        this.check = true
        if (resp.list.length) {
          this.rest.spa.init = resp.time
          this.rest.spa.list = resp.list
        }
      }, () => { })
    }
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('spa-filter', {
      time: this.rest.spa.time,
    }).then((resp) => {
      this.rest.spa.init = resp.time
      this.rest.spa.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async search() {
    await this.rest.freeze('Đang tải danh sách')
    this.rest.checkpost('spa-search', {
      keyword: this.keyword
    }).then((resp) => {
      this.rest.spa.old = resp.list
      this.rest.navCtrl.navigateForward('spa/search')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async detail(image: string) {
    this.rest.temp = image
    let modal = await this.modal.create({
      component: ModalPage
    })
    await modal.present()
  }

  public insert() {
    this.rest.temp = {
      id: 0,
      name: '',
      phone: '',
      name2: '',
      phone2: '',
      note: '',
      weight: 0,
      image: [],
      option: [],
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }

    this.rest.navCtrl.navigateForward('/spa/insert')
  }

  public update(index: number) {
    this.rest.temp = {
      id: this.rest.spa.list[index].id,
      name: this.rest.spa.list[index].name,
      phone: this.rest.spa.list[index].phone,
      name2: this.rest.spa.list[index].name2,
      phone2: this.rest.spa.list[index].phone2,
      note: this.rest.spa.list[index].note,
      image: this.rest.spa.list[index].image,
      option: this.rest.spa.list[index].option,
      weight: Number(this.rest.spa.list[index].weight),
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }
    this.rest.router.navigateByUrl('/spa/insert')
  }

  public async called(index: number) {
    let alert = await this.alert.create({
      message: 'Đã gọi cho khách?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.calledSubmit(index, e)
          }
        }
      ]
    });

    if (!this.rest.spa.list[index].duser.length) {
      alert['inputs'] = this.option
    }

    await alert.present();
  }

  public async calledSubmit(index: number, uid: number = 0) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa-called', {
      id: this.rest.spa.list[index].id,
      uid: uid,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async returned(index: number) {
    let alert = await this.alert.create({
      message: 'Thú cưng đã đón về?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.returnedSubmit(index, e)
          }
        }
      ]
    });
    if (!this.rest.spa.list[index].duser.length) {
      alert['inputs'] = this.option
    }

    await alert.present();
  }

  public async returnedSubmit(index: number, uid: number = 0) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa-returned', {
      id: this.rest.spa.list[index].id,
      uid: uid,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(index: number) {
    let alert = await this.alert.create({
      message: 'Hoàn thành mục spa?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(index, e)
          }
        }
      ]
    });

    if (!this.rest.spa.list[index].duser.length) {
      alert['inputs'] = this.option
    }

    await alert.present();
  }

  public async doneSubmit(index: number, userid: number = 0) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('spa-done', {
      id: this.rest.spa.list[index].id,
      uid: userid,
      time: this.rest.spa.time,
      ctime: this.rest.spa.init
    }).then((resp) => {
      this.rest.spa.list = resp.list
      this.rest.spa.init = resp.time
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async pickDate() {
    let current = this.time.timetodate(this.rest.spa.time).split('/')
    let target = current[2] + '-' + current[1] + '-' + current[0]
    let alert = await this.alert.create({
      header: 'Chọn ngày',
      inputs: [
        {
          label: 'Ngày',
          name: 'date',
          type: 'date',
          value: target
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Chọn ngày',
          cssClass: 'secondary',
          handler: (e) => {
            let result = e.date.split('-')
            this.rest.spa.time = this.time.datetotime(result[2] + '/' + result[1] + '/' + result[0])
            this.filter()
          }
        }
      ]
    })
    alert.present()
  }

  public async changeDate(amount: number) {
    this.rest.spa.time += amount * 60 * 60 * 24 * 1000
    this.filter()
  }
}