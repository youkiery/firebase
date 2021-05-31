import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  public html: SafeHtml
  constructor(
    public dom: DomSanitizer,
    public rest: RestService,
    public platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.html = this.dom.bypassSecurityTrustHtml(this.rest.fivemin.html)
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
      winPrint.document.write(this.rest.fivemin.html);
      setTimeout(() => {
        winPrint.print()
        winPrint.close()
      }, 300)
    }
  }
}
