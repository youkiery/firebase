import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage {
  public content: string = ''
  public userid: any
  public time = {
    cometime: '',
    calltime: ''
  }
  public picker = {
    cometime: '',
    calltime: ''
  }
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ionViewWillEnter() {
    // console.log(this.rest.today);
    this.time.cometime = this.rest.today
    this.time.calltime = this.rest.today
    this.userid = this.rest.list.employ[0]['userid']
  }

  public datepicker(name: string) {
    let datetime = this.rest.parseDate(this.picker[name])
    this.time[name] = datetime.datestring
  }

  public insert() {
    if (!this.content.length) this.rest.notify('Nội dung công việc trống')
    else {
      // console.log(this.cometime, this.calltime);
      this.rest.freeze('wi', 'Đang thêm công việc')
      this.rest.check({
        action: 'work-insert',
        startdate: this.rest.totime(this.rest.work.filter['startdate']),
        enddate: this.rest.totime(this.rest.work.filter['enddate']),
        keyword: this.rest.work.filter['keyword'],
        page1: this.rest.work.page.undone,
        page2: this.rest.work.page.done,
        user: this.rest.work.filter['user'],
        employ: this.userid,
        content: this.content,
        cometime: this.time.cometime,
        calltime: this.time.calltime,
        status: this.rest.work.reversal[this.rest.work.segment]
      }).then(data => {
        this.rest.work.unread = data['unread']
        this.rest.work.data = data['list']
        this.rest.defreeze('wi')
        this.dismiss()
      }, (error) => {
        this.rest.defreeze('wi')
      })
    }
  }

  public dismiss() {
    this.modal.dismiss()
  }
}
