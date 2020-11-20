import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  day = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
  limit = [1, 2, 2, 2, 2, 2, 1]
  color = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ]
  reversal_color = {
    'red': 'red',
    'green': 'yellow',
    'blue': 'purple',
    'yellow': 'green',
    'gray': 'gray',
    'purple': 'blue'
  }
  colorAction = {
    'yellow': 0,
    'purple': 1
  }
  temp: any
  today = ''
  constructor(
    public rest: RestService,
    private alert: AlertController
  ) {
    if (!this.rest.schedule.role) this.temp = JSON.parse(JSON.stringify(this.color))
    // console.log(this.rest.schedule.data);
  }

  ngOnInit() { }

  ionViewWillEnter() {
    let date = this.rest.today.split('/')
    this.today = date[0] + '/' + date[1]

    this.rest.freeze('sget', 'Đang lấy danh sách đăng ký')
    this.rest.check({
      action: 'schedule-auto',
      time: this.rest.schedule.filter.time
    }).then(response => {
      // console.log(response['data']);
      this.rest.schedule.data = response['data']

      if (!this.rest.schedule.role) this.parseData()
      else this.temp = JSON.parse(JSON.stringify(response['data']))
      this.rest.defreeze('sget')
    }, () => {
      this.rest.defreeze('sget')
    })
  }

  public cmpdate(date: string) {
    let today = this.rest.today.split('/')
    let datetime = date.split('/')

    if (datetime[1] > today[1]) return 1
    else if (datetime[1] == today[1] && datetime[0] > today[0]) return 1
    return 0
  }

  public parseData() {
    this.color = JSON.parse(JSON.stringify(this.temp)) // default color
    this.rest.schedule.data.forEach((data: any, index: number) => {
      if (!(this.rest.schedule.role || (this.cmpdate(data.time)))) {
        this.color[index] = ['gray', 'gray', 'gray', 'gray']
      }
      else {
        for (let i = 1; i <= 3; i++) {        
          if (data.data[i].indexOf(this.rest.user.name) >= 0) {
            // registed
            this.color[index][i] = 'blue'
          }
          else {
            // clear except
            let current = data.data[i].filter((name: any) => {
              return this.rest.list.except.indexOf(name) < 0
            })
  
            if (current.length <= this.limit[index]) {
              // safe
              this.color[index][i] = 'green'
            }
            else {
              // danger
              this.color[index][i] = 'red'
            }
          } 
        }
      }
    })
  }

  public reg(id: number, type: number) {
    this.color[id][type] = this.reversal_color[this.color[id][type]]
  }

  public reg2(index: number, id: number, type: number) {
    this.rest.schedule.data[index]['day'][id][type] = this.reversal_color[this.rest.schedule.data[index]['day'][id][type]]
  }

  public changeWeek(increaseWeek: number) {
    let time = this.rest.schedule.filter.time + 60 * 60 * 24 * 7 * 1000 * increaseWeek
    // console.log(time);
    this.rest.freeze('sauto', 'Đang lấy danh sách đăng ký')
    this.rest.check({
      action: 'schedule-auto',
      time: time
    }).then(response => {
      this.rest.schedule.data = response['data']
      if (!this.rest.schedule.role) this.parseData()
      else this.temp = JSON.parse(JSON.stringify(response['data']))
      this.rest.schedule.filter.time = time
      this.rest.defreeze('sauto')
    }, () => {
      this.rest.defreeze('sauto')
    })
  }

  public async register() {
    let list = []
    if (this.rest.schedule.role) {
      this.rest.schedule.data.forEach((data) => {
        data.day.forEach((days: any, id: number) => {
          for (let i = 2; i <= 3; i++) {
            let type = days[i]
            if (type == 'yellow' || type == 'purple') list.push({
              userid: data.id,
              day: id,
              type: i,
              color: this.colorAction[type]
            })
          }
        });
      })

      if (!list.length) this.rest.notify('Chưa chọn lịch đăng ký')
      else {
        const alert = await this.alert.create({
          header: 'Chú ý!!!',
          message: 'Lịch đăng ký sẽ thay đổi',
          buttons: [
            {
              text: 'Trở về',
              role: 'cancel',
              cssClass: 'default'
            }, {
              text: 'Đăng ký',
              cssClass: 'secondary',
              handler: () => {
                this.rest.freeze('scheck', 'Đang đăng ký công việc')
                this.rest.check({
                  action: 'schedule-regist-manager',
                  list: JSON.stringify(list),
                  time: this.rest.schedule.filter.time
                }).then(response => {
                  this.rest.schedule.data = response['data']
                  this.temp = JSON.parse(JSON.stringify(response['data']))
                  this.rest.defreeze('scheck')
                }, () => {
                  this.rest.defreeze('scheck')
                })
              }
            }
          ]
        })
        alert.present()
      }
    }
    else {
      this.color.forEach((data, index) => {
        for (let i = 1; i <= 3; i++) {        
          if (data[i] == 'yellow' || data[i] == 'purple') {
            list.push({a: index, b: i, c: this.colorAction[data[i]]})
          } 
        }
      })

      if (!list.length) this.rest.notify('Chưa chọn lịch đăng ký')
      else {
        const alert = await this.alert.create({
          header: 'Chú ý!!!',
          message: 'Lịch đăng ký sẽ thay đổi',
          buttons: [
            {
              text: 'Trở về',
              role: 'cancel',
              cssClass: 'default'
            }, {
              text: 'Đăng ký',
              cssClass: 'secondary',
              handler: () => {
                this.rest.freeze('scheck', 'Đang đăng ký công việc')
                this.rest.check({
                  action: 'schedule-regist',
                  list: JSON.stringify(list),
                  time: this.rest.schedule.filter.time
                }).then(response => {
                  this.rest.schedule.data = response['data']
                  this.temp = JSON.parse(JSON.stringify(response['data']))
                  this.parseData()
                  this.rest.defreeze('scheck')
                }, () => {
                  this.rest.defreeze('scheck')
                })
              }
            }
          ]
        })
        alert.present()
      }
    }
  }

  public cancel() {
    // console.log(this.rest.schedule.data, this.temp);
    if (this.rest.schedule.role) {
      this.rest.schedule.data = JSON.parse(JSON.stringify(this.temp))
    }
    else {
      this.color = JSON.parse(JSON.stringify(this.temp)) // default color
      this.parseData()
    }
  }
}
