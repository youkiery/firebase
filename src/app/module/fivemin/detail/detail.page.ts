import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UploadPage } from '../upload/upload.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
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
    {ten: 'muctieu', tieude: 'Mục tiêu doanh số'},
    {ten: 'chamsoc', tieude: 'Chăm sóc khách hàng'},
    {ten: 'tugiac', tieude: 'Tính tự giác'},
    {ten: 'chuyenmon', tieude: 'Mục tiêu chuyên môn'},
    {ten: 'dongdoi', tieude: 'Tính đồng đội'},
    {ten: 'giaiphap', tieude: 'Ý tưởng và pháp pháp'},
    // {ten: 'ketqua', tieude: 'Kết quả'},
    // {ten: 'uytin', tieude: 'Uy tín'},
    // {ten: 'trachnhiem', tieude: 'Trách nhiệm'},
    // {ten: 'tinhyeu', tieude: 'Tình yêu'}
  ]
  public image = []
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  public async change(id: number, status:number) {
    if (status) {
      // await this.photoService.addNewToGallery()
      // await this.rest.freeze('Đang tải ảnh lên...')
      // this.uploadImage(this.photoService.photo).then((url:string) => {
        await this.rest.freeze('Đang lưu dữ liệu...')
        this.rest.check({
          action: 'fivemin-change',
          rid: id,
          id: this.rest.fivemin.id,
          status: status,
          // image: url.replace('%2F', '@@')
        }).then(response => {
          this.rest.fivemin.data = response.data
          this.rest.defreeze()
        }, () => {
          this.rest.defreeze()
        })
      // })
    }
    else {
      await this.rest.freeze('Đang cập nhật dữ liệu...')
      this.rest.check({
        action: 'fivemin-change',
        rid: id,
        id: this.rest.fivemin.id,
        status: status,
        image: ''
      }).then(response => {
        this.rest.fivemin.data = response.data
        this.rest.defreeze()
      }, () => {
        this.rest.defreeze()
      })
    }

  }

  public async viewImage(tieuchi: string, chimuc: number, rid: number) {
    if (this.rest.fivemin.data[tieuchi][chimuc].hinhanh == '') this.rest.fivemin.image = []
    else this.rest.fivemin.image = this.rest.fivemin.data[tieuchi][chimuc].hinhanh.split(',')
    this.rest.fivemin.rid = rid
    this.rest.fivemin.lydo = this.rest.fivemin.data[tieuchi][chimuc].lydo
    this.rest.fivemin.hoanthanh = (this.rest.fivemin.data[tieuchi][chimuc].hoanthanh > 0 ? true : false)

    let modal = await this.modal.create({
      component: UploadPage
    })
    modal.present()
  }

  public update() {
    this.rest.router.navigateByUrl('/fivemin/update')
  }
}
