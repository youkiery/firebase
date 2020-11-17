import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage {
  content: string = ''
  userid: any
  cometime: string
  calltime: string
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ionViewWillEnter() {
    console.log(this.rest.today);
    this.cometime = this.rest.todate(this.rest.today)
    this.calltime = this.rest.todate(this.rest.today)
    this.userid = this.rest.list.employ[0]['userid']
  }

  public insert() {
    if (!this.content.length) this.rest.notify('Nội dung công việc trống')
    else {
      console.log(this.cometime, this.calltime);
      
      this.rest.freeze('wi', 'Đang thêm công việc')
      this.rest.check({
        action: 'work-insert',
        startdate: this.rest.totime(this.rest.work.filter['startdate']),
        enddate: this.rest.totime(this.rest.work.filter['enddate']),
        keyword: this.rest.work.filter['keyword'],
        user: this.rest.work.filter['user'],
        employ: this.userid,
        content: this.content,
        cometime: this.rest.totime(this.cometime),
        calltime: this.rest.totime(this.calltime),
      }).then(data => {
        this.rest.work.data = data['data']
        this.rest.work.time = data['time']
        this.rest.work.unread = data['unread']
        this.rest.workParse()
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
