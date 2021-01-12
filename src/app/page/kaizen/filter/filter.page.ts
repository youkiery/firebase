import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  public check: boolean = false
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController,
  ) { }

  ngOnInit() {  }

  public dismiss() {
    this.modal.dismiss()
  }

  public clear(name: string) {
    this.rest.kaizen.filter[name] = ''
  }

  public filter() {
    this.rest.freeze('kfilter', 'Filtering filter')
    this.rest.kaizen.page = 1

    this.rest.check({
      action: 'kaizen-auto',
      starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
      endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
      keyword: this.rest.kaizen.filter.keyword,
      page: this.rest.kaizen.page,
      sort: this.rest.kaizen.filter.sort
    }).then(data => {
      this.rest.kaizen.data = data['list']
      this.rest.kaizenParse()
      this.rest.defreeze('kfilter')
      this.dismiss()
    }, () => {
      this.rest.defreeze('kfilter')
    })
  }
}
