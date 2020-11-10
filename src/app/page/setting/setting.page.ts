import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  password: boolean = true
  oldpas: string = ''
  newpas: string = ''
  verpas: string = ''
  constructor(
    public alert: AlertController,
    public rest: RestService,
    public router: Router
  ) { }

  public changePassword() {
    if (!this.oldpas.length) this.rest.notify('Mật khẩu cũ trống')
    else if (!this.newpas.length) this.rest.notify('Mật khẩu mới trống')
    else if (!this.verpas.length) this.rest.notify('Mật khẩu xác nhận trống')
    else if (this.newpas !== this.verpas) this.rest.notify('Mật khẩu xác nhận không trùng nhau')
    else {
      this.rest.freeze('changepass', 'Đang đổi mật khẩu')
      this.rest.check({
        action: 'user-change-password',
        old: this.oldpas,
        new: this.newpas
      }).then(data => {
        this.rest.user.password = this.newpas
        this.rest.storage.set('userdata', this.rest.user['data'])
        this.oldpas = ''
        this.newpas = ''
        this.verpas = ''
        this.rest.defreeze('changepass')
      }, () => {
        this.rest.defreeze('changepass')
      })
    }
  }
}
