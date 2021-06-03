import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ImagePage } from '../image/image.page';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  public async gopy(index: number) {
    console.log(this.rest.fivemin.thongke.danhsach[index].gopy);

    
    const alert = await this.alert.create({
      header: 'Góp ý',
      message: 'Góp ý sẽ được hiển thị cho nhân viên',
      inputs: [{
        name: 'gopy',
        label: 'Góp ý:',
        value: this.rest.fivemin.thongke.danhsach[index].gopy,
        type: 'textarea'
      }],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.gopySubmit(e['gopy'], index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async gopySubmit(gopy: string, index: number) {
    await this.rest.freeze()
    this.rest.checkpost('fivemin-gopy', {
      gopy: gopy,
      id: this.rest.fivemin.thongke.danhsach[index].id
    }).then(response => {
      this.rest.fivemin.thongke.danhsach[index].gopy = response.gopy
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async viewImage(index: number) {
    this.rest.fivemin.image = this.rest.fivemin.thongke.danhsach[index].image.split(',')
    let modal = await this.modal.create({
      component: ImagePage
    })
    modal.present()
  }

}
