import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage {
  public option = []
  public weight = ['< 2kg', '2 - 4kg', '4 - 10kg', '10 - 15kg', '15 - 25kg', '25 - 35kg', '35 - 50kg', '> 50kg']
  public max = 640
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) { }

  ionViewDidEnter() {
    this.option = JSON.parse(JSON.stringify(this.rest.spa.type))
    
    this.rest.temp.option.forEach((id: number) => {
      this.option.forEach((item, index) => {
        if (this.option[index].id == id) this.option[index].check = 1
      })
    });
  }

  public suggest(param: number = 0) {
    this.rest.temp.param = param
    this.rest.router.navigateByUrl('/modal/suggest')
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
  }

  public remove(i: number) {
    this.rest.temp.image = this.rest.temp.image.filter((item: any, index: number) => {
      return index !== i
    })
  }

  public async uploadPWA() {
    const fileList: FileList = this.pwaphoto.nativeElement.files;
    if (fileList && fileList.length > 0) {
     await this.rest.freeze('Đang tải...')
      for (let i = 0; i < fileList.length; i++) {
        await this.firstFileToBase64(fileList[i]).then((result: string) => {
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
            this.rest.temp.image.push(canvas.toDataURL('image/jpeg'));
          }
        }, (err: any) => { });
      }
      this.rest.defreeze()
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

  public async checkSaveSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.insertSubmit()
    }
  }

  public async checkUpdateSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.updateSubmit()
    }
  }

  public async insert() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
    
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.insertSubmit()
    else this.rest.temp.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkSaveSubmit()
        })
      }
      else this.checkSaveSubmit()
    });
  }

  public async update() {
    this.count = 0
    this.rest.freeze('Đang tải ảnh...')
    
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.temp.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else if (!this.rest.temp.image.length) this.updateSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkUpdateSubmit()
        })
      }
      else this.checkUpdateSubmit()
    });
  }

  public checkOption() {
    let option = []
    this.option.forEach(item => {
      if (item.check) option.push(Number(item.id))
    });
    return option
  }

  public async insertSubmit() {
    this.rest.temp.option = this.checkOption()
    this.rest.checkpost('spa-insert', this.rest.temp).then(resp => {
      this.rest.spa.list = resp.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updateSubmit() {
    this.rest.temp.option = this.checkOption()
    this.rest.checkpost('spa-update', this.rest.temp).then(resp => {
      this.rest.spa.list = resp.list
      this.rest.defreeze()
      this.rest.navCtrl.pop()
    }, () => {
      this.rest.defreeze()
    })
  }
}