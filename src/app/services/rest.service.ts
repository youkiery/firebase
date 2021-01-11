import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@ionic/storage'; 
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public baseurl: string = 'http://localhost/index.php?server=1';
  // public baseurl: string = 'http://vetgroup.petcoffee.com/index.php?server=1';
  public user = {
    userid: '0',
    name: '',
    username: '',
    password: '',
  }
  public list = {
    employ: [],
    except: []
  }
  public work = {
    notify: [],
    time: -1,
    unread: 0,
    segment: 'undone',
    role: 0,
    userlist: '',
    list: {
      'undone': [],
      'done': []
    },
    data: [],
    filter: {
      'startdate': '',
      'enddate': '',
      'keyword': '',
      'user': []
    },
    edit: {
      'id': 0,
      'content': '',
      'note': '',
      'calltime': '',
      'process': 0,
      'image': []
    }
  }
  public kaizen = {
    time: -1,
    unread: 0,
    insert: false,
    role: 0,
    segment: 'undone',
    notify: [],
    data: [],
    list: {
      'undone': [],
      'done': []
    },
    edit: {
      id: 0,
      problem: '',
      solution: '',
      result: '',
    },
    filter: {
      starttime: '',
      endtime: '',
      keyword: '',
      sort: 'desc'
    }
  }
  public schedule = {
    data: [],
    filter: {
      time: 0
    },
    role: 0
  }
  public vaccine = {
    data: [],
    filter: [],
    filterKey: '',
    status: '0',
    role: 0,
    suggest: '',
    suggestList: [],
    select: {
      name: '',
      phone: '',
      pet: '',
    },
    disease: []
  }
  public spa = {
    type: [],
    edit: {
      id: 0,
      name: '',
      phone: '',
      note: '',
      type: [],
      image: []
    },
    select: {
      name: '',
      phone: '',
    },
    suggest: '',
    suggestList: [],
    data: [],
    current: {
      time: 0,
      datestring: ''
    },
    time: 0
  }
  public expire = {
    id: 0,
    filter: {
      name: '',
      time: '7776000'
    },
    edit: {
      id: 0,
      name: '',
      rid: 0,
      number: 0,
      expire: ''
    },
    suggestList: [],
    list: []
  }
  public ride = {
    current: {
      time: 0,
      datestring: ''
    },
    selected: '0',
    clock: 0,
    list: [
      [], []
    ],
    edit: {
      doctorid: '',
      from: '0',
      end: '0',
      destination: '',
      note: '',
      amount: '0'
    }
  }
  public blood = {
    statistic: {},
    list: [],
    edit: {
      number: 0,
      start: 0,
      end: 0,
      target: ''
    },
    number: [0, 0, 0],
    total: 0
  }
  public usg = {
    data: [],
    filter: [],
    filterKey: '',
    status: '0',
    role: 0,
    suggest: '',
    suggestList: [],
    select: {
      name: '',
      phone: '',
      pet: '',
    },
  }
  toast: any
  load: any = {}
  public today: string = ''
  public error: string = ''
  public link: string = ''
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public router: Router,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public navCtrl: NavController
  ) {  } 

  // datestring, datetime, time, dateiso
  public parseDate(obj: any) {
    // transform to datetime
    if (!obj) obj = new Date()
    else {
      obj = obj.toString()
      let datetime = obj.split("T")[0].split('-')
      if (datetime.length == 3) obj = new Date(datetime[0], Number(datetime[1]) - 1, datetime[2] )
      else if (Number(obj)) obj = new Date(Number(obj) * 1000)
      else {
        let dateobj = obj.split('/')
        if (dateobj.length == 3) {
          obj = new Date(dateobj[2], dateobj[1] - 1, dateobj[0])
        }
        else obj = new Date()
      }
    }
    // transform time
    // datestring
    let datestring = this.timetodate(obj.getTime())
    // datetime
    let datetime = obj
    // dateiso
    let dateiso = this.todate(datestring)
    // time
    let time = obj.getTime()
    return {
      'datestring': datestring,
      'datetime': datetime,
      'dateiso': dateiso,
      'time': time
    }
  }

  public check(param: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + this.buildHttpParam(param), '').toPromise().then((data) => {
        // console.log(data);
        if (data['overtime']) {
          this.notify("Đã hết thời gian sử dụng")
          this.router.navigateByUrl('/home')
          reject(data)
        }
        else {
          if (data['messenger']) this.notify(data['messenger'])
          if (data['status']) resolve(data)
          else {
            reject(data)
          }
        }
      }, (error) => {
        // console.log(error);
        this.defreeze(null)
        this.notify('Có lỗi xảy ra >.<')
        // this.error = JSON.stringify(error)
        // this.rest.notify(JSON.stringify(error))
      })
    })
  }

  public buildHttpParam(obj: Object) {
    let param = []
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const item = obj[key];
        param.push(key + '=' + item)
      }
    }
    if (this.user.userid) param.push('userid='+ this.user.userid)
    return param.length ? '&' + param.join('&') : ''
  }

  // kiểm tra trạng thái đăng nhập, nếu không, chuyển về trang đăng nhập
  // kim: đặt giới hạn thời gian, kiểm tra session trên web 
  // đăng nhập kiểm tra dữ liệu từ userlist, nếu khớp, chuyển đến tổng quan, thông báo
  // kim: kiểm tra dữ liệu từ server
  public login(username: string, password: string) {
    if (!username || !username.length) this.notify('Tên tài khoản trống')
    else if (!password ||!password.length) this.notify('Mật khẩu trống')
    else this.check({
      action: 'login',
      username: username,
      password: password
    }).then((data) => {
      this.work.unread = data['work']
      this.kaizen.unread = data['kaizen']
      this.work.role = data['workrole']
      // this.schedule.role = 0
      this.vaccine.disease = data['disease']
      // console.log(this.vaccine.disease);
      this.spa.type = data.type
      
      // this.config = data.config
      this.ride.clock = data.clock
      this.schedule.role = data['schedulerole']
      this.kaizen.role = data['kaizenrole']
      this.list.employ = data['employ']
      this.list.except = data['except']
      this.today = data['today']
      this.spa.current = this.parseDate(data['today'])
      this.ride.current = this.parseDate(data['today'])

      this.work.filter.enddate = this.todate(data['nextweek'])
      this.schedule.filter.time = this.datetotime(this.today)

      this.blood.number = data.number
      this.blood.total = data.total

      this.user = {
        userid: data['userid'],
        name: data['name'],
        username: data['username'],
        password: data['password']
      }
      this.storage.set('userdata', this.user)
      this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
      // this.router.navigateByUrl('/home')
    }, (e) => {
      // console.log(e);
    })
  }

  public logout() {
    this.user['data'] = {
      userid: '0',
      name: '',
      username: '',
      password: ''
    }
    this.storage.remove('userdata')
    this.router.navigateByUrl('/login')
  }

  public kaizenParse() {
    this.kaizen.list.done = []    
    this.kaizen.list.undone = []

    this.kaizen.data.forEach((item) => {
      if (item['done']) this.kaizen.list.done.push(item)
      else this.kaizen.list.undone.push(item)
    })
  }

  public workParse() {
    this.work.list.done = []
    this.work.list.undone = []

    this.work.data.forEach(item => {
      if (item.process >= 100) this.work.list.done.push(item)
      else this.work.list.undone.push(item)
    })
  }

  public todate(datetime: string) {
    let date = datetime.split('/')
    if (date.length === 3) return new Date(date['2'] + '/' + date['1'] + '/' + Number(date['0'])).toISOString();
    return ''
  }

  public datetotime(date: string) {
    let datestring = date.split("/")
    let datetime = new Date(Number(datestring['2']), Number(datestring['1']) - 1, Number(datestring[0]))
    return datetime.getTime()
  }

  public timetodate(time: number) {
    let datetime = new Date(time)
    let date = datetime.getDate().toString()
    date = (Number(date) < 10 ? '0' + date : date)
    let month = (datetime.getMonth() + 1).toString()
    month = (Number(month) < 10 ? '0' + month : month)
    let year = datetime.getFullYear()
    return date + '/' + month + '/' + year
  }

  public totime(time: any) {
    let datetime = time.split("T")[0].split('-')
    if (datetime.length === 3) return (Number(datetime['2']) + 1) + '/' + datetime['1'] + '/' + datetime['0']
    return ''
  }

  public async notify(text: string, duration: number = 1000) {
    this.toast = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    })
    this.toast.present()
  }

  public async freeze(name: string, text: string = 'connecting to server') {
    this.load[name] = await this.loadCtrl.create({
      cssClass: 'my-custom-class',
      message: text
    })
    await this.load[name].present()
  }

  public defreeze(name: string) {
    console.log(name);
    if (!name) {
      this.load = {}
      return 0
    }
    let count = 3
    
    let interval = setInterval(() => {
      // console.log(name);
      count --
      if (this.load[name]) {
        this.load[name].dismiss()
        delete this.load[name]
        clearInterval(interval)
      }
      if (!count) clearInterval(interval)
    }, 300)
  }
}
