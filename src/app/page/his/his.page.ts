import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { AlertController } from '@ionic/angular';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-his',
  templateUrl: './his.page.html',
  styleUrls: ['./his.page.scss'],
})
export class HisPage implements OnInit {
  public insult = {
    0: 'stl-card',
    1: 'stl-card green',
    2: 'stl-card red',
  }
  public insult_text = {
    0: 'Đang lưu bệnh',
    1: 'Đã ra viện',
    2: 'Đã chết'
  }
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  constructor(
    public rest: RestService,
    public time: TimeService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.his.init) this.filter()
  }

  public async filter() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('his-filter', { }).then((resp) => {
      this.rest.his.init = 1
      this.rest.his.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertHis(index: number) {
    const alert = await this.alert.create({
      message: 'Thêm tiền sử bệnh',
      inputs: [{
        name: 'his',
        label: 'Tiền sử',
        value: ''
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertHisSubmit(index, e.his)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertDetail(i: number) {
    this.rest.temp = {
      index: i,
      id: this.rest.his.list[i].id,
      time: this.time.datetoisodate(this.rest.today),
      name: this.rest.his.list[i].customer,
      phone: this.rest.his.list[i].phone,
      petlist: [],
      pet: 0,
      eye: '',
      temperate: '',
      other: '',
      treat: '',
      status: Number(this.rest.his.list[i].status),
    }
    this.rest.navCtrl.navigateForward('his/insert')    
  }

  public async insertHisSubmit(index: number, his: string) {
    await this.rest.freeze('Đang thêm tiền sử')
    this.rest.checkpost('his-add', {
      petid: this.rest.his.list[index].petid,
      his: his
    }).then((resp) => {
      this.rest.his.list[index].his = resp.his
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public view(i: number, j: number) {
    this.rest.tam = {
      i: i, j: j
    }
    this.rest.navCtrl.navigateForward('his/detail')
  }

  public insert() {
    this.rest.temp = {
      name: '',
      phone: '',
      petlist: [],
      pet: 0,
      eye: '',
      temperate: '',
      other: '',
      treat: '',
      status: 0
    }
    this.rest.navCtrl.navigateForward('his/insert')
  }

}
