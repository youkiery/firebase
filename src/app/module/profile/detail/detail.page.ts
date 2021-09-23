import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  html: SafeHtml = ''
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public dom: DomSanitizer,
    public platform: Platform,
    // public printer: Printer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.html = this.dom.bypassSecurityTrustHtml(this.rest.profile.print)
  }

  public print() {
    if (this.platform.platforms().indexOf('mobile') >= 0) {
      // mobile
      this.rest.notify('Không tìm thấy máy in')
    }
    else {
      // browser
      let winPrint = window.open();
      winPrint.focus()
      winPrint.document.write(this.rest.profile.print);
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    }
  }

  public async download() {
    await this.rest.freeze()
    this.rest.check({
      action: 'profile-download',
      id: this.rest.profile.id
    }).then(response => {
      window.open(response.link)
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
