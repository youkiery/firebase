import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ImagePage } from '../image/image.page';
import { RatePage } from '../rate/rate.page';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
  public tieuchi = {
    'muctieu': 'Mục tiêu doanh số',
    'chamsoc': 'Chăm sóc khách hàng',
    'tugiac': 'Tính tự giác',
    'chuyenmin': 'Mục tiêu chuyên môn',
    'dongdoi': 'Tính đồng đội',
    'giaiphap': 'Ý tưởng và pháp pháp',
  }
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController,
    public popover: PopoverController
  ) { }

  ngOnInit() {
    console.log(this.rest.fivemin.thongke.danhsach);
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
      this.rest.fivemin.thongke.danhsach[index].gopy = response.gopy.gopy
      this.rest.fivemin.thongke.danhsach[index].nguoigopy = response.gopy.nguoigopy
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async rate(i: number, j: number, k: number) {
    let rate = this.rest.fivemin.thongke.danhsach[i].dulieu[j].danhsach[k].sao
    this.rest.fivemin.rate = {
      i: i, j: j, k: k
    }

    const popover = await this.popover.create({
      component: RatePage,
      componentProps: {
        rate: rate
      },
      translucent: true
    });
    return await popover.present();
  }

  public async viewImage(i: number, j: number, k: number) {
    this.rest.fivemin.image = this.rest.fivemin.thongke.danhsach[i].dulieu[j].danhsach[k].image.split(',')
    let modal = await this.modal.create({
      component: ImagePage
    })
    modal.present()
  }

}
