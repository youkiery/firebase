import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() { }

  public save() {
    let action = 'edit'
    if (this.rest.kaizen.insert) action = 'insert'
    this.rest.freeze('kedit', 'Saving data')
    this.rest.check({
      action: 'kaizen-' + action,
      id: this.rest.kaizen.edit.id,
      problem: this.rest.kaizen.edit.problem,
      solution: this.rest.kaizen.edit.solution,
      result: this.rest.kaizen.edit.result,
      starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
      endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
      keyword: this.rest.kaizen.filter.keyword,
      page1: this.rest.kaizen.page.undone,
      page2: this.rest.kaizen.page.done,
      type: this.rest.kaizen.reversal_segment[this.rest.kaizen.segment],
      sort: this.rest.kaizen.filter.sort
    }).then(data => {
      this.rest.kaizen.data = data['list']
      this.rest.kaizen.unread = data['unread']
      this.rest.defreeze('kedit')
      this.dismiss()
    }, (e) => {
      this.rest.defreeze('kedit')
    })
  }

  public dismiss() {
    this.modal.dismiss()
  }

}
