import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public logo = 'assets/image/logo.png'
  public username: string
  public password: string
  private subscription: any
  private version: string = '0.0.1'
  constructor(
    public rest: RestService,
    public navCtrl: NavController,
    public platform: Platform
  ) { }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  public ngOnInit() {
    this.rest.freeze('check', 'Kiểm tra phiên bản')
    this.rest.check({
      action: 'version'
    }).then(data => {
      this.rest.defreeze('check')

      if (this.version === data['version']) {
        this.rest.freeze('cuser', 'Kiểm tra thông tin người dùng')
        this.rest.storage.get('userdata').then((val) => {
          if (val && val['username'] && val['password']) {
            this.rest.login(val['username'], val['password'])
          }
          this.rest.defreeze('cuser')
        })
      }
      else {
        this.rest.link = data['link']
        this.navCtrl.navigateRoot('/update', { animated: true, animationDirection: 'forward' })
      }
    }, () => {
      this.rest.defreeze('check')
    })
  }
}
