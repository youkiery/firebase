import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-gopy',
  templateUrl: './gopy.page.html',
  styleUrls: ['./gopy.page.scss'],
})
export class GopyPage implements OnInit {
  public gopy = ''
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public async ionViewWillEnter() {
    if (!this.rest.ktgopy) {
      await this.rest.freeze()
      this.rest.check({
        action: 'gopy-init',
      }).then(response => {
        this.rest.ktgopy = true
        this.rest.dsgopy = response.list
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }
  }

  public async done(id: number) {
    await this.rest.freeze()
    this.rest.check({
      action: 'gopy-done',
      id: id
    }).then(response => {
      this.rest.dsgopy = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async xacnhangopy(gopy = '') {
    await this.rest.freeze()
    this.rest.check({
      action: 'gopy',
      gopy: gopy
    }).then(() => {
      this.gopy = ''
      this.rest.notify('Thông tin đã gửi đến nhân viên kỹ thuật, cảm ơn vì đã đóng góp')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}

