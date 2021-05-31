import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  public count = 0
  constructor(
    public photoService: PhotoService,
    public rest: RestService,
    private storage: AngularFireStorage,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  public remove(index: number) {
    this.rest.fivemin.image = this.rest.fivemin.image.filter((item, item_index) => {
      return index != item_index
    })
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

  public async upload() {
    await this.photoService.addNewToGallery()
    this.rest.fivemin.image.push(this.photoService.photo)
  }

  public async save() {
    this.count = 0
    
    if (!this.rest.fivemin.image.length) this.saveSubmit()
    else this.rest.fivemin.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.fivemin.image[index] = url.replace('%2F', '@@')
          this.checkSaveSubmit()
        })
      }
      else this.checkSaveSubmit()
    });
  }

  public async checkSaveSubmit() {
    this.count ++
    if (this.rest.fivemin.image.length == this.count) {
      this.saveSubmit()
    }
  }

  public async saveSubmit() {
    this.rest.freeze('Đang tải ảnh...')
    this.rest.checkpost('fivemin-upload', {
      id: this.rest.fivemin.id,
      rid: this.rest.fivemin.rid,
      image: this.rest.fivemin.image.join(','),
    }).then(response => {
      this.rest.fivemin.data = response.data
      this.modal.dismiss()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
