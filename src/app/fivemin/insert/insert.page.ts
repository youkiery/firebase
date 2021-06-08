import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public dulieu = [
    {ten: 'muctieu', truong: [{giatri: ''}], tieude: 'Mục tiêu doanh số'},
    {ten: 'chamsoc', truong: [{giatri: ''}], tieude: 'Chăm sóc khách hàng'},
    {ten: 'tugiac', truong: [{giatri: ''}], tieude: 'Tính tự giác'},
    {ten: 'chuyenmin', truong: [{giatri: ''}], tieude: 'Mục tiêu chuyên môn'},
    {ten: 'dongdoi', truong: [{giatri: ''}], tieude: 'Tính đồng đội'},
    {ten: 'giaiphap', truong: [{giatri: ''}], tieude: 'Ý tưởng và giải pháp'},
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
    this.dulieu[chimuctieuchi].truong.push({giatri: ''})
    console.log(this.dulieu)
  }

  public xoaTruong(chimuctieuchi: number, chimuc: number) {
    let list = this.dulieu[chimuctieuchi].truong.filter((item, index) => {
      return index !== chimuc
    })
    if (!list.length) list = [{giatri: ''}]
    
    this.dulieu[chimuctieuchi].truong = list
  }

  public async insert() {
    let danhsach = {}
    this.dulieu.forEach((tieuchi) => {
      let dulieu = []
      tieuchi.truong.forEach(truong => {
        dulieu.push(truong.giatri)
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
