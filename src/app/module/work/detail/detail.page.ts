import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  constructor(
    public rest: RestService,
    public modal: ModalController,
  ) { }

  public dismiss() {
    this.modal.dismiss()
  }

  ngOnInit() {}

}
