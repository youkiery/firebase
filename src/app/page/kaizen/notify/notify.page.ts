import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {

  constructor(
    public rest: RestService,
  ) { }

  ngOnInit() { }

  public detail(id: number) {
    // console.log(id);
  }

  ionViewWillEnter() {
    this.rest.check({
      action: 'kaizen-notify'
    }).then(data => {
      // console.log(data);
      this.rest.kaizen.unread = 0
      this.rest.kaizen.notify = data['list']
    }, (e) => {})
  }
}
