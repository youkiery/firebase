import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@ionic/storage'; 
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public branch = 'test'
  public baseurl: string = 'http://localhost/server/index.php?';
  // public baseurl: string = '/server/index.php?';
  // public baseurl: string = 'https://daklak.thanhxuanpet.com/server/index.php?';
  // public baseurl: string = 'http://test.petcoffee.info/server/index.php?';
  public admin = {
    type: 0,
    index: 0,
    users: [],
    select: {

    }
  }
  public fivemin = {
    image: [''],
    index: 0,
    rid: 0,
    lydo: '',
    hoanthanh: false,
    init: false,
    init2: false,
    html: '',
    thongke: {
      dulieu: [],
      danhsach: []
    },
    data: {
      id: 0,
      chamsoc: [],
      tugiac: [],
      giaiphap: [],
      ketqua: [],
      uytin: [],
      dongdoi: [],
      trachnhiem: [],
      tinhyeu: []
    },
    list: [],
    filter: {
      page: 1,
      start: new Date((new Date().getTime() - 1000 * 60 * 60 * 24 * 3)).toISOString(),
      end: (new Date()).toISOString()
    },
    id: 0
  }
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
    init: 0,
    reversal: {
      'undone': 0,
      'done': 1
    },
    page: {
      'undone': 1,
      'done': 1
    },
    notify: [],
    unread: 0,
    segment: 'undone',
    role: 0,
    userlist: '',
    data: {
      'undone': [],
      'done': []
    },
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
    init: 0,
    reversal_segment: {
      'undone': 0,
      'done': 1
    },
    page: {
      undone: 1,
      done: 1
    },
    time: -1,
    unread: 0,
    insert: false,
    role: 0,
    segment: 'undone',
    notify: [],
    data: {
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
    init: 0,
    page: 1,
    statistic: {
      from: '',
      end: '',
      number: 0,
      sample: 0,
      total: 0,
      list: []
    },
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
  public drug = {
    init: false,
    role: 0,
    list: [],
    index: 0,
    update: false,
    filter: {
      name: '',
      effect: ''
    }
  }
  public profile = {
    id: 0,
    type: [],
    sampletype: [],
    target: [],
    init: 0,
    print: '',
    suggest: {
      select: {
        customer: '',
        address: '',
        phone: ''
      },
      list: [],
      key: ''
    },
    data2: {
      id: 0,
      name: '',
      intro: '',
      unit: '',
      flag: '',
      up: '',
      down: '',
      disease: '',
      aim: ''
    },
    data: {
      id: 0,
      customer: '',
      address: '',
      name: '',
      weight: '',
      age: '',
      gender: '0',
      type: 0,
      sampleid: '',
      serial: 0,
      sampletype: 0,
      samplenumber: '',
      samplesymbol: '',
      samplestatus: 1,
      doctor: '',
      time: 0,
      target: []
    },
    list: [],
    serial: 0,
    filter: {
      key: '',
      keyword: '',
      page: 1
    },
  }
  public config = {
    work: 0,
    kaizen: 0,
    schedule: 0,
    vaccine: 0,
    spa: 0,
    expire: 0,
    blood: 0,
    usg: 0,
    drug: 0,
    target: 0,
    profile: 0,
  }
  toast: any
  load: any
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

  public async freeze(text: string = 'connecting to server') {
    console.log(this.load);
    let loading = await this.loadCtrl.create({
      message: text
    })
    this.load = loading
    await this.load.present()
  }

  public defreeze() {
    this.load.dismiss()
  }

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
        if (data['overtime']) {
          this.notify("Đã hết thời gian sử dụng")
          this.router.navigateByUrl('/home')
          reject(data)
        }
        else if (data['no_branch']) {
          this.notify("Tài khoản không có trong chi nhánh")
          this.router.navigateByUrl('/')
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
        if (error['messenger']) this.notify(error['messenger'])
        else this.notify('Có lỗi xảy ra >.<')
        reject(1)
        // this.error = JSON.stringify(error)
        // this.rest.notify(JSON.stringify(error))
      })
    })
  }

  public checkpost(action: string, param: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseurl + 'action='+action+'&userid='+ this.user.userid, JSON.stringify(param)).toPromise().then((data) => {
        if (data['overtime']) {
          this.notify("Đã hết thời gian sử dụng")
          this.router.navigateByUrl('/home')
          reject(data)
        }
        else if (data['no_branch']) {
          this.notify("Tài khoản không có trong chi nhánh")
          this.router.navigateByUrl('/')
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
        if (error['messenger']) this.notify(error['messenger'])
        else this.notify('Có lỗi xảy ra >.<')
        reject(1)
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
    if (this.user.userid) param.push('&branch='+ this.branch +'&userid='+ this.user.userid)
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
      password: password,
      branch: this.branch
    }).then((data) => {
      this.work.unread = data['work']
      this.kaizen.unread = data['kaizen']
      this.vaccine.disease = data['disease']
      this.spa.type = data.type
      
      // this.config = data.config
      this.ride.clock = data.clock
      this.list.employ = data['employ']
      this.list.except = data['except']
      this.today = data['today']
      this.spa.current = this.parseDate(data['today'])
      this.ride.current = this.parseDate(data['today'])
      for (const key in data['config']) {
        if (Object.prototype.hasOwnProperty.call(data['config'], key)) {
          this.config[key] = Number(data['config'][key])
        }
      }
      this.admin.type = Number(data['admin'])

      this.work.filter.enddate = this.todate(data['nextweek'])
      this.schedule.filter.time = this.datetotime(this.today)

      this.blood.number = data.number
      this.blood.total = data.total

      this.profile.serial = Number(data.serial)
      this.profile.type = data.type
      this.profile.sampletype = data.sampletype
      this.profile.target = data.target

      this.user = {
        userid: data['userid'],
        name: data['name'],
        username: data['username'],
        password: data['password']
      }
      this.storage.set('userdata', this.user)
      this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' })
      this.defreeze()
    }, (e) => {
      this.defreeze()
    })
  }

  public isNumber(number: number) {
    return isFinite(number)
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
    let datetime = new Date(Number(time))
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

  public isodatetotime(time: any) {
    let datetime = time.split("T")[0].split('-')
    if (datetime.length === 3) return (new Date(datetime[0], Number(datetime[1]) - 1, datetime[2])).getTime()
    return 0
  }

  public async notify(text: string, duration: number = 1000) {
    this.toast = await this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    })
    this.toast.present()
  }
}
