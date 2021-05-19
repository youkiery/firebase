import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    public modal: ModalController
  ) { }

  ngOnInit() {
    if (!this.rest.target.init) {
      this.getData()
    }
  }

  public print(id: number) {
    console.log(id)
  }

  public async insert() {
    let modal = await this.modal.create({
      component: InsertProfile
    })
    modal.present()
  }

  public async detail(id: number) {
    this.rest.check({
      action: 'profile-get',
      id: id
    }).then(response => {
      this.rest.profile.data = response.data
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
    let modal = await this.modal.create({
      component: DetailPage
    })
    modal.present()
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
