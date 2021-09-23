import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController,
  ) { }

  public async ionViewWillEnter() {
    await this.rest.freeze('Đang lấy thông báo')
    this.rest.check({
      action: 'work-notify'
    }).then(data => {
      this.rest.work.notify = data.notify
      this.rest.work.unread = 0
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  ngOnInit() { }

  public async detail(id: number) {
    let current = this.rest.work.data.done.filter((item) => {
      return item['id'] === id
    })
    if (!current) {
      current = this.rest.work.data.undone.filter((item) => {
        return item['id'] === id
      })
    }
    
    current = current[0]
    if (!current) this.rest.notify('Công việc đã xóa')
    else {
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
      await modal.present()
    }
  }
}
