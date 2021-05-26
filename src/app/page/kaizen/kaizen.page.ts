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
  constructor(
    public alert: AlertController,
    public modal: ModalController,
    public rest: RestService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.rest.kaizen.page = {
      undone: 1,
      done: 1
    }

    this.rest.check({
      action: 'kaizen-init',
      starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
      endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
      keyword: this.rest.kaizen.filter.keyword,
      type: this.rest.kaizen.reversal_segment[this.rest.kaizen.segment],
      page1: this.rest.kaizen.page.undone,
      page2: this.rest.kaizen.page.done,
      sort: this.rest.kaizen.filter.sort
    }).then(data => {
      this.rest.kaizen.init = 1
      this.rest.kaizen.unread = data.unread
      this.rest.kaizen.data = data.list
    }, (error) => { })
  }

  public filter() {
    return new Promise((resolve) => {
      this.rest.check({
        action: 'kaizen-auto',
        starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
        endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
        keyword: this.rest.kaizen.filter.keyword,
        type: this.rest.kaizen.reversal_segment[this.rest.kaizen.segment],
        page: this.rest.kaizen.page[this.rest.kaizen.segment],
        sort: this.rest.kaizen.filter.sort,
      }).then(data => {
        if (data['list']) {
          this.rest.kaizen.unread = data['unread']
          this.rest.kaizen.time = data.time
          if (data.list) this.rest.kaizen.data[this.rest.kaizen.segment] = this.rest.kaizen.data[this.rest.kaizen.segment].concat(data.list)
          resolve('')
        }
      }, (e) => {
        resolve('')
      })
    })
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
            this.checkerSubmit(id)
          }
        }
      ]
    })
    alert.present()
  }

  public async checkerSubmit(id: number) {
    await this.rest.freeze('Đang hoàn thành...')
    this.rest.check({
      action: 'kaizen-check',
      id: id,
      type: this.rest.kaizen.reversal_segment[this.rest.kaizen.segment],
      starttime: this.rest.totime(this.rest.kaizen.filter.starttime),
      endtime: this.rest.totime(this.rest.kaizen.filter.endtime),
      keyword: this.rest.kaizen.filter.keyword,
      page1: this.rest.kaizen.page.undone,
      page2: this.rest.kaizen.page.done,
      sort: this.rest.kaizen.filter.sort
    }).then(data => {
      this.rest.kaizen.data = data['list']
      this.rest.defreeze()
    }, () => [
      this.rest.defreeze()
    ])
  }

  public async filterM() {
    if (this.rest.config.kaizen < 2) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      let modal = await this.modal.create({
        component: FilterPage
      })
      modal.present()
    }
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
            this.removeSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang xóa giải pháp')
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
      this.rest.kaizen.data = data['list']
      this.rest.defreeze()
    }, (error) => {
      this.rest.defreeze()
    })
  }

  public loadData(event) {
    this.rest.kaizen.page[this.rest.kaizen.segment] += 1
    
    this.filter().then(() => {
      event.target.complete();
    })
  }
}

