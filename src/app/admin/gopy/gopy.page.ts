import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-gopy',
  templateUrl: './gopy.page.html',
  styleUrls: ['./gopy.page.scss'],
})
export class GopyPage {
  public list = []
  constructor(
    public rest: RestService
  ) { }

  public async ionViewWillEnter() {
    await this.rest.freeze()
    this.rest.check({
      action: 'gopy-init',
    }).then(response => {
      this.list = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(id: number) {
    await this.rest.freeze()
    this.rest.check({
      action: 'gopy-done',
      id: id
    }).then(response => {
      this.list = response.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
