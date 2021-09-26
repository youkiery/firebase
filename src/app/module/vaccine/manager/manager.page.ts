import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {
  public input: any = {}
  public list = []
  public prv = ''
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController,
  ) { }

  ngOnInit() {

  }

  public update(index: number) {
    this.rest.action = 'vaccine'
    this.rest.temp = {
      prv: 'temp',
      id: this.rest.vaccine.temp[index].id,
      name: this.rest.vaccine.temp[index].name,
      phone: this.rest.vaccine.temp[index].phone,
      vaccine: Number(this.rest.typeIndex(this.rest.vaccine.temp[index].vaccine)),
      cometime: this.rest.vaccine.temp[index].cometime,
      calltime: this.rest.vaccine.temp[index].calltime,
    }
    console.log(this.rest.temp);
    this.rest.router.navigateByUrl('/vaccine/insert')
  }

  public updateType(index: number) {
    this.prv = 'type'
    this.rest.action = 'insert-type'
    this.input = {
      id: this.rest.vaccine.type[index].id,
      name: this.rest.vaccine.type[index].name,
      code: this.rest.vaccine.type[index].code
    }
  }

  public async insertType() {
    this.prv = 'type'
    this.rest.action = 'insert-type'
    this.input = {
      name: '',
      code: ''
    }
  }

  public async removeTypeSubmit(id: number) {
    await this.rest.freeze('Đang xóa loại nhắc...')
    this.rest.checkpost('vaccine-remove', {
      id: id,
    }).then(resp => {
      this.rest.vaccine.type = resp.list
      this.rest.action = 'type'
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateTypeSubmit() {
    await this.rest.freeze('Cập nhật loại nhắc...')
    this.rest.checkpost('vaccine-updatetype', {
      id: this.input.id,
      code: this.input.code,
      name: this.input.name
    }).then(resp => {
      this.rest.vaccine.type = resp.list
      this.rest.action = 'type'
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertTypeSubmit() {
    await this.rest.freeze('Thêm loại nhắc...')
    this.rest.checkpost('vaccine-inserttype', {
      code: this.input.code,
      name: this.input.name
    }).then(resp => {
      this.rest.vaccine.type = resp.list
      this.rest.action = 'type'
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public updateDoctor(index: number) {
    this.prv = 'doctor'
    this.rest.action = 'insert-doctor'
    this.input = {
      id: this.rest.vaccine.doctor[index].id,
      userid: this.rest.vaccine.doctor[index].userid,
      username: this.rest.vaccine.doctor[index].username,
      name: this.rest.vaccine.doctor[index].name
    }
  }

  public async insertDoctor() {
    this.prv = 'doctor'
    this.rest.action = 'insert-doctor'
    this.input = {
      userid: 0,
      username: '',
      name: ''
    }
  }

  public async removeDoctorSubmit(id: number) {
    await this.rest.freeze('Đang xóa loại nhắc...')
    this.rest.checkpost('vaccine-removedoctor', {
      id: id,
    }).then(resp => {
      this.rest.vaccine.doctor = resp.list
      this.rest.action = 'doctor'
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateDoctorSubmit() {
    await this.rest.freeze('Cập nhật bác sĩ...')
    this.rest.checkpost('vaccine-updatedoctor', {
      id: this.input.id,
      user: this.input.userid,
      name: this.input.name
    }).then(resp => {
      this.rest.vaccine.doctor = resp.list
      this.rest.action = 'doctor'
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertDoctorSubmit() {
    await this.rest.freeze('Thêm bác sĩ...')
    this.rest.checkpost('vaccine-insertdoctor', {
      user: this.input.userid,
      name: this.input.name
    }).then(resp => {
      this.rest.vaccine.doctor = resp.list
      this.rest.action = 'doctor'
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async searchDoctor() {
    await this.rest.freeze('Đang tìm kiếm...')
    this.rest.checkpost('vaccine-searchdoctor', {
      keyword: this.input.username
    }).then(resp => {
      this.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public select(userid: number, username: string, name: string) {
    this.input.userid = userid
    this.input.username = username
    this.input.name = name
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;

    let body = new FormData();
    body.append('file', fileList[0]);
    body.append('userid', this.rest.user.userid);
    body.append('action', 'vaccine-excel');

    this.rest.http.post(this.rest.baseurl, body).toPromise().then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

  public async remove(id: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận xóa lịch nhắc',
      subHeader: 'Sau khi xác nhận lịch nhắc sẽ biến mất',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removeSubmit(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async removeSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine-remove', {
      id: id,
      temp: 1
    }).then(resp => {
      this.rest.vaccine.temp = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async done(id: number) {
    const alert = await this.alert.create({
      header: 'Xác nhận thêm lịch nhắc',
      subHeader: 'Sau khi xác nhận lịch nhắc sẽ hiển thị trên danh sách nhắc gọi',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(id)
          }
        }
      ]
    });
    await alert.present();
  }

  public async doneSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('vaccine-confirm', {
      id: id,
      temp: 1
    }).then(resp => {
      this.rest.vaccine.temp = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public change(type: string = 'type') {
    this.rest.action = type
  }

  public back() {
    this.rest.action = this.prv
  }
}
