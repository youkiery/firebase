import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { RestService } from 'src/app/services/rest.service';
import { UploadPage } from '../upload/upload.page';

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
  public image = []
  constructor(
    public rest: RestService,
    public photoService: PhotoService,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }


  public async change(id: number, status:number) {
    if (status) {
      // await this.photoService.addNewToGallery()
      // await this.rest.freeze('Đang tải ảnh lên...')
      // this.uploadImage(this.photoService.photo).then((url:string) => {
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
      await this.rest.freeze('Đang cập nhật dữ liệu')
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
    let modal = await this.modal.create({
      component: UploadPage
    })
    modal.present()
  }

  // public update() {
  //   this.rest.router.navigateByUrl('/fivemin/update')
  // }
}
