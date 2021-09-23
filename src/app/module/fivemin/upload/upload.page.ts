import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  public lydo = ""
  public hoanthanh = false
  public imgURI: string = null
  public max = 500
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public photoService: PhotoService,
    public rest: RestService,
    private storage: AngularFireStorage,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  public upload() {
    // if (this.pwaphoto == null) {
    //   return;
    // }
    this.pwaphoto.nativeElement.click();
  }

  public async uploadPWA() {
    // if (this.pwaphoto == null) {
    //   return;
    // }
    await this.rest.freeze('Đang tải...')
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
      this.firstFileToBase64(fileList[0]).then((result: string) => {
        let image = new Image();
        image.src = result
        image.onload = () => {
          let canvas = document.createElement('canvas')
          let context = canvas.getContext('2d')
          let rate = 1
          if (image.width > this.max || image.height > this.max) {
            if (image.width > image.height) rate = image.width / this.max
            else rate = image.height / this.max
          }
          let newWidth = image.width / rate
          let newHeight = image.height / rate
          canvas.width = newWidth
          canvas.height = newHeight
          context.drawImage(image, 0, 0, canvas.width, canvas.height)

          this.rest.fivemin.image.push(canvas.toDataURL('image/jpeg'));
          this.rest.defreeze()
        }
      }, (err: any) => {
        // Ignore error, do nothing
        // this.imgURI = null;
        this.rest.defreeze()
      });
    }
  }

  private firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  ionViewWillEnter() {
    this.lydo = this.rest.fivemin.lydo
    this.hoanthanh = this.rest.fivemin.hoanthanh
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

  // public async upload() {
  //   await this.photoService.addNewToGallery()
  //   this.rest.fivemin.image.push(this.photoService.photo)
  // }

  public async save() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
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
    this.rest.checkpost('fivemin-upload', {
      id: this.rest.fivemin.id,
      rid: this.rest.fivemin.rid,
      lydo: this.lydo,
      hoanthanh: Number(this.hoanthanh),
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
