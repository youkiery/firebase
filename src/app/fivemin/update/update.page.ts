import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  public dulieu = [
    {ten: 'muctieu', truong: [{id: 0, giatri: ''}], tieude: 'Mục tiêu doanh số'},
    {ten: 'chamsoc', truong: [{id: 0, giatri: ''}], tieude: 'Chăm sóc khách hàng'},
    {ten: 'tugiac', truong: [{id: 0, giatri: ''}], tieude: 'Tính tự giác'},
    {ten: 'chuyenmin', truong: [{id: 0, giatri: ''}], tieude: 'Mục tiêu chuyên môn'},
    {ten: 'dongdoi', truong: [{id: 0, giatri: ''}], tieude: 'Tính đồng đội'},
    {ten: 'giaiphap', truong: [{id: 0, giatri: ''}], tieude: 'Ý tưởng và giải pháp'},
    // {ten: 'ketqua', truong: [{giatri: ''}], tieude: 'Kết quả'},
    // {ten: 'uytin', truong: [{giatri: ''}], tieude: 'Uy tín'},
    // {ten: 'trachnhiem', truong: [{giatri: ''}], tieude: 'Trách nhiệm'},
    // {ten: 'tinhyeu', truong: [{giatri: ''}], tieude: 'Tình yêu'}
  ]
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.dulieu);
    
    this.dulieu.forEach((item, index) => {
      let dulieutam = []
      if (this.rest.fivemin.data[item.ten]) {
        this.rest.fivemin.data[item.ten].forEach(tieuchi => {
          dulieutam.push({
            id: tieuchi.id,
            giatri: tieuchi.noidung
          })
        });
        this.dulieu[index].truong = dulieutam
      }
    });
  }

  public themTruong(chimuctieuchi: number) {
    this.dulieu[chimuctieuchi].truong.push({
      id: 0,
      giatri: ''
    })
    console.log(this.dulieu)
  }

  public async update() {
    let danhsach = {}
    this.dulieu.forEach((tieuchi) => {
      let dulieu = []
      tieuchi.truong.forEach(truong => {
        dulieu.push(truong)
      })
      danhsach[tieuchi.ten] = dulieu
    })

    await this.rest.freeze('Đang thêm dữ liệu')
    this.rest.checkpost('fivemin-update', {
      id: this.rest.fivemin.id,
      danhsach: danhsach
    }).then(response => {
      this.rest.fivemin.data = response.get
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
