import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private subscription: any
  constructor(
    public rest: RestService,
    public platform: Platform,
    public alert: AlertController
  ) { }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  public async gopy() {
    let alert = await this.alert.create({
      header: 'Góp ý cải thiện phần mềm',
      message: 'Mục góp ý sẽ được gửi để nhân viên kỹ thuật, và hoàn toàn ẩn danh',
      inputs: [{
        name: 'gopy',
        type: 'textarea',
        value: ''
      }],
      buttons: [{
        text: 'Hủy',
        role: 'cancel'
      }, {
        text: 'Xác nhận',
        handler: (e) => {
          this.xacnhangopy(e.gopy)
        }
      }]
    })
    alert.present()
  }

  public async xacnhangopy(gopy = '') {
    await this.rest.freeze()
    this.rest.check({
      action: 'gopy',
      gopy: gopy
    }).then(() => {
      this.rest.notify('Thông tin đã gửi đến nhân viên kỹ thuật, cảm ơn vì đã đóng góp')
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
