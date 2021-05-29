import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PhotoService } from 'src/app/services/photo.service';
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
    public rest: RestService,
    public photoService: PhotoService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  public uploadImage(image: string) {
    return new Promise((resolve) => {
      const path = 'images/' + new Date().getTime() + '.jpg';
      let fileRef = this.storage.ref(path);
      let base64 = image.substr(image.indexOf(',') + 1);
      let metadata = {
        contentType: 'image/jpeg',
      };

      fileRef.putString(base64, 'base64', metadata).then((response) => {
        fileRef.getDownloadURL().subscribe(url => {
          resolve(url)
        })
      }, (error) => {
        resolve('')
      })
    })
  }

  public async change(id: number, status:number) {
    await this.photoService.addNewToGallery()
    console.log(this.photoService.photo);
    
    // await this.rest.freeze()
    // this.uploadImage(base64).then(url => {
    //   this.rest.check({
    //     action: 'fivemin-change',
    //     rid: id,
    //     id: this.rest.fivemin.id,
    //     status: status,
    //     image: url
    //   }).then(response => {
    //     this.rest.fivemin.data = response.data
    //     this.rest.defreeze()
    //   }, () => {
    //     this.rest.defreeze()
    //   })
    // })
    
  }

  // public update() {
  //   this.rest.router.navigateByUrl('/fivemin/update')
  // }
}
