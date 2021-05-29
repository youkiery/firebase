import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { interval } from 'rxjs';
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

  public async ngOnInit() {
    await this.rest.freeze('Kiểm tra thông tin người dùng...')
    this.rest.storage.get('userdata').then((val) => {
      if (val && val['username'] && val['password']) {
        this.rest.login(val['username'], val['password'])
      }
      else this.rest.defreeze()
    })
  }
}
