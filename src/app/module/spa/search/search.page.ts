import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  public async detail(image: string) {
    this.rest.temp = image
    let modal = await this.modal.create({
      component: ModalPage
    })
    await modal.present()
  }

  ngOnInit() {
  }

}
