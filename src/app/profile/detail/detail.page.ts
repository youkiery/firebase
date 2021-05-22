import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  public print() {
    let winPrint = window.open();
    winPrint.focus()
    winPrint.document.write(this.rest.profile.print);
    // if (!prev) {
    setTimeout(() => {
      winPrint.print()
      winPrint.close()
    }, 300)
  }

  public download() {
    this.rest.check({
      action: 'profile-download',
      id: this.rest.profile.id
    }).then(response => {
      window.open(response.link)
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }
}
