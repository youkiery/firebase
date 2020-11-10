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
  constructor(
    public alert: AlertController,
    public modal: ModalController,
    public rest: RestService
  ) { }

  ngOnInit() {
    if (!this.rest.kaizen.data.length) {
      this.rest.freeze('kload', 'Getting data list')
      this.getKaizenList().then(() => {
        this.rest.defreeze('kload')
      })
    }
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
      this.getKaizenList().then(() => {
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
              sort: this.rest.kaizen.filter.sort
            }).then(data => {
              this.rest.kaizen.data = data['list']
              this.rest.kaizenParse()
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

  public getKaizenList() {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'kaizen-auto',
        time: this.rest.kaizen.time,
        starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
        endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
        keyword: this.rest.kaizen.filter.keyword,
        sort: this.rest.kaizen.filter.sort
      }).then(data => {
        if (data['list']) {
          this.rest.kaizen.unread = data['unread']
          this.rest.kaizen.time = data.time
          this.rest.kaizen.data = data['list']
          this.rest.kaizenParse()
          resolve()
        }
      }, (e) => {
        resolve()
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
      let current = this.rest.kaizen.list[this.rest.kaizen.segment][index]
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
              sort: this.rest.kaizen.filter.sort
            }).then((data) => {

              this.rest.kaizen.unread = data['unread']
              this.rest.kaizen.time = data['time']
              this.rest.kaizen.data = data['list']
              this.rest.kaizenParse()
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
}

