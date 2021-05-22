import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { InsertProfile } from './insert/insert.page';
import { RestService } from '../services/rest.service';
import { DetailPage } from './detail/detail.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController,
    public alert: AlertController,
  ) { }

  ngOnInit() {
    if (!this.rest.target.init) {
      this.getData()
    }
  }

  public print(id: number) {
    this.rest.check({
      action: 'profile-print',
      id: id
    }).then(response => {
      let html = response.html
      let winPrint = window.open();
      winPrint.focus()
      winPrint.document.write(html);
      // if (!prev) {
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Chú ý!!!',
      message: 'Hồ sơ sẽ bị xóa vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.rest.check({
              action: 'profile-remove',
              id: id,
              keyword: this.rest.profile.filter.keyword,
              page: this.rest.profile.filter.page
            }).then(response => {
              this.rest.profile.list = response.list
              this.rest.defreeze('load')
            }, () => {
              this.rest.defreeze('load')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  public async insert() {
    this.rest.router.navigateByUrl('/profile/insert')
  }

  public async detail(id: number) {
    this.rest.check({
      action: 'profile-print',
      id: id
    }).then(response => {
      this.rest.profile.id = id
      this.rest.profile.print = response.html
      this.rest.router.navigateByUrl('profile/detail')
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }

  public async loadData(event: any) {
    this.rest.profile.filter.page ++
    this.getData().then(() => {
      event.target.complete ()
    })
  }

  public filter() {
    this.rest.profile.filter.page = 1
    this.rest.profile.list = []
    this.getData()
  }

  public async getData() {
    return new Promise(resolve => {
      this.rest.check({
        action: 'profile-init',
        keyword: this.rest.profile.filter.keyword,
        page: this.rest.profile.filter.page,
      }).then(response => {
        this.rest.profile.list = this.rest.profile.list.concat(response.list)
        this.rest.profile.init = true
        this.rest.defreeze('load')
        resolve(true)
      }, () => {
        this.rest.defreeze('load')
        resolve(true)
      })
    }) 
  }
}
