import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {
  public check: boolean = false
  constructor(
    public alert: AlertController,
    public rest: RestService,
    public modal: ModalController
  ) { }

  public checkall() {
    this.rest.work.filter['user'] = []
    let list = []
    if (this.check) {
      this.rest.list.employ.forEach((item) => {
        list.push(item['name'])
        this.rest.work.filter['user'].push(item['userid'])
      })
    }
    this.rest.work.userlist = list.join(', ')
  }

  public dismiss() {
    this.modal.dismiss()
  }

  public filter() {
    this.rest.freeze('wf', 'Lọc công việc')
    this.rest.work.page = {
      'undone': 1,
      'done': 1
    }

    this.rest.check({
      action: 'work-init',
      startdate: this.rest.totime(this.rest.work.filter.startdate),
      enddate: this.rest.totime(this.rest.work.filter.enddate),
      keyword: this.rest.work.filter['keyword'],
      user: this.rest.work.filter['user'].join(','),
      page: this.rest.work.page[this.rest.work.segment],
    }).then(data => {
      this.rest.work.init = 1
      this.rest.work.unread = data.unread
      this.rest.work.data = data.list
      this.rest.defreeze('wf')
      this.dismiss()
    }, () => {
      this.rest.defreeze('wf')
    })
  }

  public async selectEmploy() {
    let input = []
    this.rest.list.employ.forEach((item) => {
      let checked = false
      if (this.rest.work.filter['user'].indexOf(item['userid']) >= 0) checked = true
      input.push({
        type: 'checkbox',
        label: item['name'],
        value: item['userid'],
        checked: checked
      })
    })
    let alert = await this.alert.create({
      header: 'Select employ list',
      inputs: input,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {  }
        }, {
          text: 'Ok',
          handler: (e) => {
            let list = []
            this.rest.work.filter['user'] = []
            e.forEach((item: string) => {
              let current = this.rest.list.employ.filter((item2) => {
                return item2['userid'] === item
              })
              if (current.length) {
                list.push(current[0]['name'])
                this.rest.work.filter['user'].push(current[0]['userid'])
              }
            })
            this.rest.work.userlist = list.join(', ')
          }
        }
      ]
    })
    alert.present()
  }

  public clear() {
    this.rest.work.filter.startdate = ''
  }
}
