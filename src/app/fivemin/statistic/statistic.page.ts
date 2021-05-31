import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  public async viewImage(index: number) {
    this.rest.fivemin.image = this.rest.fivemin.thongke.danhsach[index].image.split(',')
    let modal = await this.modal.create({
      component: ImagePage
    })
    modal.present()
  }

}
