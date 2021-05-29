import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public dulieu = [
    {ten: 'chamsoc', tieude: 'Chăm sóc khách hàng'},
    {ten: 'tugiac', tieude: 'Tự giác'},
    {ten: 'giaiphap', tieude: 'Giái pháp đạt mục tiêu'},
    {ten: 'ketqua', tieude: 'Kết quẳ'},
    {ten: 'uytin', tieude: 'Uy tín'},
    {ten: 'dongdoi', tieude: 'Giúp đỡ đồng đội'},
    {ten: 'trachnhiem', tieude: 'Trách nhiệm'},
    {ten: 'tinhyeu', tieude: 'Tình yêu'}
  ]
  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public async change(id: number, status:number) {
    await this.rest.freeze()
    this.rest.check({
      action: 'fivemin-change',
      rid: id,
      id: this.rest.fivemin.id,
      status: status
    }).then(response => {
      this.rest.fivemin.data = response.data
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  // public update() {
  //   this.rest.router.navigateByUrl('/fivemin/update')
  // }
}
