import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { DetailPage } from './detail/detail.page';
import { EditPage } from './edit/edit.page'
import { FilterPage } from './filter/filter.page';
import { InsertPage } from './insert/insert.page'
import { PrintPage } from './print/print.page';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.rest.work.init) this.filter()
    else {
      this.rest.work.page = {
        'undone': 1,
        'done': 1
      }
  
      this.rest.check({
        action: 'work-init',
      }).then(data => {
        this.rest.work.init = 1
        this.rest.work.unread = data.unread
        this.rest.work.data = data.list
      }, (error) => { })
    }
  }

  public filter() {
    return new Promise(resolve => {
      this.rest.check({
        action: 'work-auto',
        'time': this.rest.work['time'],
        'startdate': this.rest.totime(this.rest.work.filter.startdate),
        'endate': this.rest.totime(this.rest.work.filter['enddate']),
        'keyword': this.rest.work.filter['keyword'],
        'user': this.rest.work.filter['user'].join(','),
        'page': this.rest.work.page[this.rest.work.segment],
        'status': this.rest.work.reversal[this.rest.work.segment]
      }).then(response => {
        this.rest.work.unread = response['unread']
        this.rest.work.data[this.rest.work.segment] = this.rest.work.data[this.rest.work.segment].concat(response.list)
        resolve('')
      }, (error) => { 
        resolve('')
      })
    })
  }

  public async print() {
    const modal = await this.modal.create({
      component: PrintPage,
      componentProps: {
        startdate: this.rest.totime(this.rest.work.filter['startdate']),
        enddate: this.rest.totime(this.rest.work.filter['enddate']),
        keyword: this.rest.work.filter['keyword'],
        user: this.rest.work.filter['user'],
        page: this.rest.work.page[this.rest.work.segment]
      }
    })
    modal.present()
  }

  public async detail(id: number) {
    this.rest.freeze('detail', 'Getting data')
    let current = this.rest.work.data.undone.filter((item) => {
      return item['id'] === id
    })
    if (!current) {
      current = this.rest.work.data.done.filter((item) => {
        return item['id'] === id
      })
    }

    current = current[0]
    this.rest.work.edit = {
      'id': current['id'],
      'content': current['content'],
      'note': current['note'],
      'calltime': this.rest.todate(current['calltime']),
      'process': Number(current['process']),
      'image': current['image']
    }
    const modal = await this.modal.create({
      component: DetailPage
    })
    await modal.present().then(() => {
      this.rest.defreeze('detail')
    })
  }

  public async done(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Công việc sẽ được chuyển sang mục hoàn thành',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.rest.freeze('wdone', 'Đang hoàn thành')
            this.rest.check({
              action: 'work-done',
              startdate: this.rest.totime(this.rest.work.filter['startdate']),
              enddate: this.rest.totime(this.rest.work.filter['enddate']),
              keyword: this.rest.work.filter['keyword'],
              user: this.rest.work.filter['user'],
              'page': this.rest.work.page[this.rest.work.segment],
              id: id,
              'status': this.rest.work.reversal[this.rest.work.segment]
            }).then((data) => {
              this.rest.work.unread = data['unread']
              this.rest.work['time'] = data['time']
              this.rest.work.data = data['list']
              this.rest.defreeze('wdone')
            }, (error) => {
              this.rest.defreeze('wdone')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Công việc sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
          cssClass: 'default'
        }, {
          text: 'Xác nhận',
          cssClass: 'danger',
          handler: () => {
            this.rest.freeze('wr', 'Đang xóa công việc')
            this.rest.check({
              action: 'work-remove',
              startdate: this.rest.totime(this.rest.work.filter['startdate']),
              enddate: this.rest.totime(this.rest.work.filter['enddate']),
              keyword: this.rest.work.filter['keyword'],
              user: this.rest.work.filter['user'],
              'page': this.rest.work.page[this.rest.work.segment],
              id: id,
              'status': this.rest.work.reversal[this.rest.work.segment]
            }).then((data) => {
              this.rest.work.unread = data['unread']
              this.rest.work['time'] = data['time']
              this.rest.work.data = data['list']
              this.rest.defreeze('wr')
            }, (error) => {
              this.rest.defreeze('wr')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  public async filterM() {
    if (!this.rest.work.role) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const modal = await this.modal.create({
        component: FilterPage,
        componentProps: {
          startdate: this.rest.totime(this.rest.work.filter['startdate']),
          enddate: this.rest.totime(this.rest.work.filter['enddate']),
          keyword: this.rest.work.filter['keyword'],
          user: this.rest.work.filter['user'],
          'page': this.rest.work.page[this.rest.work.segment]
        }
      })
      await modal.present()
    }
  }

  public async insert() {
    if (!this.rest.work.role) this.rest.notify('Chưa cấp quyền truy cập')
    else {
      const modal = await this.modal.create({
        component: InsertPage,
      })
      await modal.present()
    }
  }

  public async edit(index: number) {
    let current = this.rest.work.data[this.rest.work['segment']][index]
    
    this.rest.work.edit = {
      'id': current['id'],
      'content': current['content'],
      'note': current['note'],
      'calltime': this.rest.todate(current['calltime']),
      'process': Number(current['process']),
      'image': current['image']
    }
    const modal = await this.modal.create({
      component: EditPage,
    })
    await modal.present()
  }

  public async notify() {
    this.rest.router.navigateByUrl('/work/notify')
  }

  public loadData(event) {
    this.rest.work.page[this.rest.work.segment] ++
    
    this.filter().then(() => {
      event.target.complete()
    })
  }
}
