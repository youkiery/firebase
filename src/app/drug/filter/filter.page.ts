import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(
    public modal: ModalController,
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  filter() {
    this.rest.freeze('filter', 'Đang lọc thuốc')
    this.rest.check({
      action: 'drug-filter',
      name: this.rest.drug.filter.name,
      effect: this.rest.drug.filter.effect,
      target: this.rest.drug.filter.target
    }).then(response => {
      this.rest.drug.list = response.data
      this.modal.dismiss()
      this.rest.defreeze('filter')
    }, (response) => {
      this.rest.notify(response.messenger)
      this.rest.defreeze('filter')
    })
  }
}
