import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public code: string = ''
  public name: string = ''
  public disease: string = ''
  public effective: string = ''
  public limit: string = ''
  public effect: string = ''
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  insert() {
    this.rest.freeze('load', 'Thêm thuốc...')
    this.rest.check({
      action: 'drug-insert',
      code: this.code,
      name: this.name,
      disease: this.disease,
      effective: this.effective,
      limit: this.limit,
      effect: this.effect,
    }).then(() => {
      this.modal.dismiss()
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }
}
