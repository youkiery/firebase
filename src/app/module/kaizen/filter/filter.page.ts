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
  public check_reversal_segment = {
    'undone': 0,
    'done': 1
  }
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

  public async filter() {
    await this.rest.freeze('Filtering filter')
    this.rest.kaizen.page = {
      undone: 1,
      done: 1
    }

    this.rest.check({
      action: 'kaizen-init',
      starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
      endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
      keyword: this.rest.kaizen.filter.keyword,
      page1: this.rest.kaizen.page.undone,
      page2: this.rest.kaizen.page.done,
      sort: this.rest.kaizen.filter.sort
    }).then(data => {
      this.rest.kaizen.data = data['list']
      this.rest.defreeze()
      this.dismiss()
    }, () => {
      this.rest.defreeze()
    })
  }
}
