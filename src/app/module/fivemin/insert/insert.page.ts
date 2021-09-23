import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public thoigian = [
    'Thời gian',
    '07h - 08h',
    '08h - 09h',
    '09h - 10h',
    '10h - 11h',
    '11h - 12h',
    '12h - 13h',
    '13h - 14h',
    '14h - 15h',
    '15h - 16h',
    '16h - 17h',
    '17h - 18h',
    '18h - 19h'
  ]
  public dulieu = [
    {ten: 'muctieu', truong: [{thoigian: 0, giatri: ''}], tieude: 'Mục tiêu doanh số'},
    {ten: 'chamsoc', truong: [{thoigian: 0, giatri: ''}], tieude: 'Chăm sóc khách hàng'},
    {ten: 'tugiac', truong: [{thoigian: 0, giatri: ''}], tieude: 'Tính tự giác'},
    {ten: 'chuyenmon', truong: [{thoigian: 0, giatri: ''}], tieude: 'Mục tiêu chuyên môn'},
    {ten: 'dongdoi', truong: [{thoigian: 0, giatri: ''}], tieude: 'Tính đồng đội'},
    {ten: 'giaiphap', truong: [{thoigian: 0, giatri: ''}], tieude: 'Ý tưởng và giải pháp'},
    // {ten: 'ketqua', truong: [{giatri: ''}], tieude: 'Kết quả'},
    // {ten: 'uytin', truong: [{giatri: ''}], tieude: 'Uy tín'},
    // {ten: 'trachnhiem', truong: [{giatri: ''}], tieude: 'Trách nhiệm'},
    // {ten: 'tinhyeu', truong: [{giatri: ''}], tieude: 'Tình yêu'}
  ]
  constructor(
    public rest: RestService
  ) {}

  ngOnInit() {
  }

  public themTruong(chimuctieuchi: number) {
    this.dulieu[chimuctieuchi].truong.push({thoigian: 0, giatri: ''})
    console.log(this.dulieu)
  }

  public xoaTruong(chimuctieuchi: number, chimuc: number) {
    let list = this.dulieu[chimuctieuchi].truong.filter((item, index) => {
      return index !== chimuc
    })
    if (!list.length) list = [{thoigian: 0, giatri: ''}]
    
    this.dulieu[chimuctieuchi].truong = list
  }

  public async insert() {
    let danhsach = {}
    this.dulieu.forEach((tieuchi) => {
      let dulieu = []
      tieuchi.truong.forEach(truong => {
        dulieu.push(truong)
      })
      danhsach[tieuchi.ten] = dulieu
    })

    await this.rest.freeze('Đang thêm dữ liệu')
    this.rest.checkpost('fivemin-insert', danhsach).then(response => {
      this.rest.fivemin.list = [response.data].concat(this.rest.fivemin.list)
      this.rest.fivemin.id = response.data.id
      this.rest.fivemin.data = response.get
      this.rest.fivemin.gopy = response.gopy
      this.rest.defreeze()
      this.nav()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async nav() {
    this.rest.navCtrl.pop()
    await this.rest.freeze('Đang thêm dữ liệu')
    setTimeout(() => {
      this.rest.router.navigateByUrl('/fivemin/detail')
      this.rest.defreeze()
    }, 500);
  }
}
