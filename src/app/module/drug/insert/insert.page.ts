import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public name: string = ''
  public limit: string = ''
  public effect: string = ''
  public sideeffect: string = ''
  public mechanic: string = ''
  public image = []
  public max = 640
  public count = 0
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public modal: ModalController,
    private storage: AngularFireStorage,
  ) { }

  ionViewWillEnter() {
    if (this.rest.drug.update) {
      this.name = this.rest.drug.list[this.rest.drug.index].name
      this.limit = this.rest.drug.list[this.rest.drug.index].limits
      this.effect = this.rest.drug.list[this.rest.drug.index].effect
      this.sideeffect = this.rest.drug.list[this.rest.drug.index].sideeffect
      this.mechanic = this.rest.drug.list[this.rest.drug.index].mechanic
      this.image = this.rest.drug.list[this.rest.drug.index].image
    }
  }

  ngOnInit() { }

  public async insert() {
    this.rest.checkpost('drug-insert', {
      name: this.name,
      limit: encodeURI(this.limit.replace('/', '')),
      effect: encodeURI(this.effect.replace('/', '')),
      sideeffect: encodeURI(this.sideeffect.replace('/', '')),
      mechanic: encodeURI(this.mechanic.replace('/', '')),
      image: this.image,
      key_name: this.rest.drug.filter.name,
      key_effect: this.rest.drug.filter.effect
    }).then((response) => {
      this.rest.drug.list = response.list
      this.rest.defreeze()
      this.modal.dismiss()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async update() {
    this.rest.checkpost('drug-update', {
      name: this.name,
      limit: encodeURI(this.limit),
      effect: encodeURI(this.effect.replace('/', '')),
      sideeffect: encodeURI(this.sideeffect.replace('/', '')),
      mechanic: encodeURI(this.mechanic.replace('/', '')),
      image: this.image.join(', '),
      id: this.rest.drug.list[this.rest.drug.index].id,
    }).then((response) => {
      this.rest.drug.list[this.rest.drug.index] = response.data
      this.rest.defreeze()
      this.modal.dismiss()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async drugInsert() {
    this.count = 0
    await this.rest.freeze('Đang thêm...')

    if (!this.image.length) this.insert()
    else this.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          console.log(url);
          this.image[index] = url.replace('%2F', '@@')
          this.checkDrugInsertSubmit()
        })
      }
      else this.checkDrugInsertSubmit()
    });
  }

  public async drugUpdate() {
    this.count = 0
    await this.rest.freeze('Đang cập nhật...')

    console.log(this.image);
    
    if (!this.image.length) this.update()
    else this.image.forEach((image, index) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.image[index] = url.replace('%2F', '@@')
          this.checkDrugUpdateSubmit()
        })
      }
      else this.checkDrugUpdateSubmit()
    });
  }

  public async checkDrugInsertSubmit() {
    this.count++
    if (this.image.length == this.count) {
      this.insert()
    }
  }

  public async checkDrugUpdateSubmit() {
    this.count++
    if (this.image.length == this.count) {
      this.update()
    }
  }

  public remove(i: number) {
    this.image = this.image.filter((item: any, index: number) => {
      return index !== i
    })
  }

  public upload() {
    this.pwaphoto.nativeElement.click();
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
            this.image.push(canvas.toDataURL('image/jpeg'));
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
}
