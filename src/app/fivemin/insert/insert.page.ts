import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public dulieu = [
    {ten: 'chamsoc', truong: [{giatri: ''}], tieude: 'Chăm sóc khách hàng'},
    {ten: 'tugiac', truong: [{giatri: ''}], tieude: 'Tự giác'},
    {ten: 'giaiphap', truong: [{giatri: ''}], tieude: 'Giái pháp đạt mục tiêu'},
    {ten: 'ketqua', truong: [{giatri: ''}], tieude: 'Kết quẳ'},
    {ten: 'uytin', truong: [{giatri: ''}], tieude: 'Uy tín'},
    {ten: 'dongdoi', truong: [{giatri: ''}], tieude: 'Giúp đỡ đồng đội'},
    {ten: 'trachnhiem', truong: [{giatri: ''}], tieude: 'Trách nhiệm'},
    {ten: 'tinhyeu', truong: [{giatri: ''}], tieude: 'Tình yêu'}
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
      danhsach[tieuchi.ten] = dulieu.join(',')
    })

    await this.rest.freeze()
    this.rest.check({
      action: 'fivemin-insert',
      chamsoc: danhsach['chamsoc'],
      tugiac: danhsach['tugiac'],
      giaiphap: danhsach['giaiphap'],
      ketqua: danhsach['ketqua'],
      uytin: danhsach['uytin'],
      dongdoi: danhsach['dongdoi'],
      trachnhiem: danhsach['trachnhiem'],
      tinhyeu: danhsach['tinhyeu'],
      time: this.rest.isodatetotime(this.rest.fivemin.filter.time)
    }).then(response => {
      this.rest.fivemin.list = response.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    })
  }
}
