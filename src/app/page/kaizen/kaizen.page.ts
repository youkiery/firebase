import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { EditPage } from './edit/edit.page';
import { FilterPage } from './filter/filter.page';

@Component({
  selector: 'app-kaizen',
  templateUrl: './kaizen.page.html',
  styleUrls: ['./kaizen.page.scss'],
})
export class KaizenPage implements OnInit {
  autoupdate: boolean = false
  interval: any
  public check_reversal_segment = {
    'undone': 1,
    'done': 0
  }
  public AUTO = 1
  constructor(
    public alert: AlertController,
    public modal: ModalController,
    public rest: RestService
  ) { }

  ngOnInit() {
    this.rest.freeze('kload', 'Getting data list')
    this.getKaizenList().then(() => {
      this.rest.defreeze('kload')
    })
  }

  ionViewWillEnter() {
    this.filter()
    this.interval = setInterval(() => {
      this.filter()
    }, 5000)
  }

  ionViewWillLeave() {
    clearInterval(this.interval)
  }

  public filter() {
    if (!this.autoupdate) {
      this.autoupdate = true
      this.getKaizenList(this.AUTO).then(() => {
        this.autoupdate = false
      })
    }
  }

  public async checker(id: number) {
    let alert = await this.alert.create({
      message: 'Hoàn thành sẽ không thể hoàn tác',
      buttons: [
        {
          text: 'Bỏ',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'secondary',
          handler: (e) => {
            this.rest.freeze('kcheck', 'Đang hoàn thành...')
            this.rest.check({
              action: 'kaizen-check',
              id: id,
              type: this.check_reversal_segment[this.rest.kaizen.segment],
              starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
              endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
              keyword: this.rest.kaizen.filter.keyword,
              page: this.rest.kaizen.page[this.rest.kaizen.segment],
              sort: this.rest.kaizen.filter.sort
            }).then(data => {
              this.rest.kaizen.data[this.rest.kaizen.segment] = data['list']
              this.rest.defreeze('kcheck')
            }, () => [
              this.rest.defreeze('kcheck')
            ])
          }
        }
      ]
    })
    alert.present()
  }

  public getKaizenList(auto = 0) {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'kaizen-auto',
        time: this.rest.kaizen.time,
        starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
        endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
        keyword: this.rest.kaizen.filter.keyword,
        page: this.rest.kaizen.page[this.rest.kaizen.segment],
        auto: auto,
        sort: this.rest.kaizen.filter.sort
      }).then(data => {
        if (data['list']) {
          this.rest.kaizen.unread = data['unread']
          this.rest.kaizen.time = data.time
          this.rest.kaizen.data[this.rest.kaizen.segment] = data['list']
          resolve('')
        }
      }, (e) => {
        resolve('')
      })
    })
  }

  public async filterM() {
    let modal = await this.modal.create({
      component: FilterPage
    })
    modal.present()
  }

  public async edit(insert = false, index: number = 0) {
    this.rest.kaizen.insert = insert
    if (insert) {
      this.rest.kaizen.edit = {
        id: 0,
        problem: '',
        solution: '',
        result: '',
      }
    }
    else {
      let current = this.rest.kaizen.data[this.rest.kaizen.segment][index]
      this.rest.kaizen.edit = {
        id: current['id'],
        problem: current['problem'],
        solution: current['solution'],
        result: current['result']
      }
    }
    let modal = await this.modal.create({
      component: EditPage
    })
    modal.present()
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Giải pháp sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở vể',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.rest.freeze('kremove', 'Đang xóa giải pháp')
            this.rest.check({
              action: 'kaizen-remove',
              id: id,
              starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
              endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
              keyword: this.rest.kaizen.filter.keyword,
              page: this.rest.kaizen.page[this.rest.kaizen.segment],
              type: this.rest.kaizen.segment,
              sort: this.rest.kaizen.filter.sort
            }).then((data) => {
              this.rest.kaizen.unread = data['unread']
              this.rest.kaizen.time = data['time']
              this.rest.kaizen.data[this.rest.kaizen.segment] = data['list']
              this.rest.defreeze('kremove')
            }, (error) => {
              this.rest.defreeze('kremove')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  public loadData(event) {
    this.rest.kaizen.page[this.rest.kaizen.segment] ++
    this.getKaizenList().then(() => {
      event.target.complete();
    })
  }
}

