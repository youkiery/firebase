import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
  public doc: string = ''
  public name: string = ''
  public preview: SafeResourceUrl
  public time: any
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public sanitizer: DomSanitizer,
    public platform: Platform
  ) { }

  ngOnInit() { 
    this.time = this.rest.todate(this.rest.today)
  }

  public async ionViewDidEnter() {
    await this.rest.freeze('Đang tạo file')
    this.rest.check({
      action: 'word-work-print',
      time: this.rest.totime(this.time)
    }).then(data => {
      this.doc = data['doc']
      this.name = data['name']
      this.preview = this.sanitizer.bypassSecurityTrustResourceUrl(data['preview'])
      this.rest.defreeze()
    }, () => [
      this.rest.defreeze()
    ])
  }

  public async changeWeek(increaseWeek: number) {
    let time = this.rest.datetotime(this.rest.totime(this.time)) + 60 * 60 * 24 * 7 * 1000 * increaseWeek
    this.time = this.rest.todate(this.rest.timetodate(time))
    await this.rest.freeze('Đang tạo file')
    this.rest.check({
      action: 'word-work-print',
      time: this.rest.totime(this.time)
    }).then(data => {
      this.doc = data['doc']
      this.name = data['name']
      this.preview = this.sanitizer.bypassSecurityTrustResourceUrl(data['preview'])
      this.rest.defreeze()
    }, () => [
      this.rest.defreeze()
    ])
  }

  public async download() {
    window.open(this.doc)
    // if (this.platform.platforms() == 'android')
  //   let loading = await this.loading.create({
  //     message: 'Đang tải về: 0%',
  //     spinner: 'circles'
  //   })
  //   await loading.present();

  //   this.fileTransfer.onProgress((e) => {
  //     let percent =  e.loaded / e.total * 100;
  //     percent = Math.round(percent);
  //     loading.message = 'Đang tải về: ' + percent + '%'
  //   })

  //   this.fileTransfer.download(this.doc, File.dataDirectory + this.name).then((entry) => {
  //     loading.dismiss()
  //     this.rest.notify('Đã tải file về: ' + File.dataDirectory + this.name)
  //   }, (error) => {
  //     loading.dismiss()
  //     this.rest.notify('Có lỗi xảy ra >.<')
  //   });
  // }
  // public dismiss() {
  //   this.modal.dismiss()
  }

  public dismiss() {
    this.modal.dismiss()
  }
}
