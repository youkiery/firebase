import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  public update() {
    this.rest.temp = {
      id: this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].id,
      name: this.rest.his.list[this.rest.tam.i].customer,
      phone: this.rest.his.list[this.rest.tam.i].phone,
      petlist: [],
      pet: this.rest.his.list[this.rest.tam.i].petid,
      eye: this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].eye,
      temperate: this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].temperate,
      other: this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].other,
      treat: this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].treat,
      status: Number(this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].status),
    }
    
    this.rest.navCtrl.navigateForward('his/insert')
  }

  public async insertHis() {
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
            this.insertHisSubmit(e.his)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertHisSubmit(his: string) {
    await this.rest.freeze('Đang thêm tiền sử')
    this.rest.checkpost('his-add', {
      petid: this.rest.his.list[this.rest.tam.i].petid,
      his: his
    }).then((resp) => {
      this.rest.his.list[this.rest.tam.i].his = resp.his
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

}
