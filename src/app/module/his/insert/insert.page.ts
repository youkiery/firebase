import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public status = [
    { id: 0, name: 'Bình thường' },
    { id: 1, name: 'Yếu' },
    { id: 2, name: 'Rất yếu' },
  ]
  public list = []
  constructor(
    public rest: RestService,
    public alert: AlertController
  ) {
    
    console.log(this.rest.temp);
   }

  ngOnInit() {

  }

  public suggest() {
    this.rest.temp.param = 0
    this.rest.navCtrl.navigateForward('modal/suggest')
  }

  public async save() {
    await this.rest.freeze('Đang thêm dữ liệu...')
    let temp = JSON.parse(JSON.stringify(this.rest.his.filter))
    temp.filter = this.rest.his.filter
    this.rest.checkpost('his-insert', this.rest.temp).then((resp) => {
      this.rest.his.list = resp.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update() {
    await this.rest.freeze('Đang cập nhật dữ liệu')
    this.rest.checkpost('his-update', this.rest.temp).then((resp) => {
      this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].eye = this.rest.temp.eye
      this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].temperate = this.rest.temp.temperate
      this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].other = this.rest.temp.other
      this.rest.his.list[this.rest.tam.i].detail[this.rest.tam.j].treat = this.rest.temp.treat
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertDetail() {
    await this.rest.freeze('Đang thêm dữ liệu')
    this.rest.checkpost('his-detail', this.rest.temp).then((resp) => {
      this.rest.his.list[this.rest.temp.index].detail.push(resp.data)
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertPet() {
    const alert = await this.alert.create({
      message: 'Thêm thú cưng',
      inputs: [{
        name: 'name',
        label: 'Tên thú cưng',
        value: ''
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertPetSubmit(e.name)
          }
        }
      ]
    });

    await alert.present();
  }
  
  public async insertPetSubmit(name: string) {
    await this.rest.freeze('Đang thêm dữ liệu')
    this.rest.checkpost('his-pet', {
      name: name,
      customer: this.rest.temp.name,
      phone: this.rest.temp.phone,
    }).then((resp) => {
      this.rest.temp.pet = resp.petid.toString()
      this.rest.temp.petlist = resp.petlist
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
