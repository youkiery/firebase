import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  public images = []
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.images = this.rest.fivemin.thongke.danhsach[this.rest.fivemin.index].image.split(',')
  }

}
