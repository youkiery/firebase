import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {
  @Input('rate') rate: number = 0
  public list = [0, 0, 0]
  constructor(
    public rest: RestService,
    public popover: PopoverController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    for (let i = 0; i < this.rate; i++) {
      this.list[i] = 1
    }
  }

  public async rateSubmit(point: number) {
    let rate = this.rest.fivemin.rate
    await this.rest.freeze()
    this.rest.checkpost('fivemin-rate', {
      id: this.rest.fivemin.thongke.danhsach[rate.i].dulieu[rate.j].danhsach[rate.k].id,
      point: point + 1
    }).then(resp => {
      this.rest.fivemin.thongke.danhsach[rate.i].dulieu[rate.j].danhsach[rate.k].sao = point + 1
      this.popover.dismiss()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
