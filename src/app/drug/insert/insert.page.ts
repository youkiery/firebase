import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public name: string = ''
  public limit: string = ''
  public effect: string = ''
  public sideeffect: string = ''
  public mechanic: string = ''
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ionViewWillEnter() {
    this.name = this.rest.drug.list[this.rest.drug.index].name
    this.limit = this.rest.drug.list[this.rest.drug.index].limits
    this.effect = this.rest.drug.list[this.rest.drug.index].effect
    this.sideeffect = this.rest.drug.list[this.rest.drug.index].sideeffect
    this.mechanic = this.rest.drug.list[this.rest.drug.index].mechanic
  }

  ngOnInit() { }

  insert() {
    this.rest.freeze('load', 'Thêm thuốc...')
    this.rest.check({
      action: 'drug-insert',
      name: this.name,
      limit: encodeURI(this.limit),
      effect: encodeURI(this.effect),
      sideeffect: encodeURI(this.sideeffect),
      mechanic: encodeURI(this.mechanic),
      key_name: this.rest.drug.filter.name,
      key_effect: this.rest.drug.filter.effect
    }).then((response) => {
      this.rest.drug.list = response.data
      this.modal.dismiss()
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  update() {
    this.rest.freeze('load', 'Cập nhật thông tin...')
    this.rest.check({
      action: 'drug-update',
      name: this.name,
      limit: encodeURI(this.limit),
      effect: encodeURI(this.effect),
      sideeffect: encodeURI(this.sideeffect),
      mechanic: encodeURI(this.mechanic),
      id: this.rest.drug.list[this.rest.drug.index].id,
      key_name: this.rest.drug.filter.name,
      key_effect: this.rest.drug.filter.effect
    }).then((response) => {
      this.rest.drug.list[this.rest.drug.index] = response.data
      this.modal.dismiss()
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }
}
