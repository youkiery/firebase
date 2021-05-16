import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public users = []
  constructor(
    public rest: RestService
  ) { }

  ionViewDidEnter() {
    this.rest.check({
      action: 'admin-user',
    }).then((data) => {
      this.users = data.users
    }, () => {})
  }

  ngOnInit() {
  }

}
