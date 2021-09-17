import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  public max = 640
  public count = 0
  public key = ''
  @ViewChild('pwaphoto') pwaphoto: ElementRef;
  constructor(
    public rest: RestService,
    public alert: AlertController,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.rest.action.length) this.rest.navCtrl.navigateRoot('home')
    if (this.rest.temp.action == 'purchase') this.purchaseInit()
    if (this.rest.temp.action == 'transfer') this.transferInit()
    if (this.rest.temp.action == 'expired') this.expiredInit()
    if (this.rest.temp.action == 'position') this.positionInit()
  }

  public async positionInit() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item-position_init', {}).then(resp => {
      this.rest.temp.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async purchaseInit() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item-purchase_init', {}).then(resp => {
      this.rest.temp.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async transferInit() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item-transfer_init', {}).then(resp => {
      this.rest.temp.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async expiredInit() {
    await this.rest.freeze('Đang tải danh sách...')
    this.rest.checkpost('item-expired_init', {}).then(resp => {
      this.rest.temp.list = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async updatePosition(i: number) {
    this.rest.temp.action = 'update'
    this.rest.temp.prv = i
    this.rest.temp.id = this.rest.temp.list[i].id
    this.rest.temp.pos = this.rest.temp.list[i].name
    this.rest.temp.image = [this.rest.temp.list[i].image]
  }
  
  public async checkupdatePosition() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.updatePositionSubmit()
    }
  }

  public async updatePositionCheck() {
    this.count = 0
    await this.rest.freeze('Đang tải ảnh...')
    if (!this.rest.temp.image.length) this.updatePositionSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.updatePositionSubmit()
        })
      }
      else this.updatePositionSubmit()
    });
  }

  public async updatePositionSubmit() {
    this.rest.checkpost('item-uppos', {
      id: this.rest.temp.id,
      pos: this.rest.temp.pos,
      image: this.rest.temp.image,
    }).then((resp) => {
      this.rest.item.image[this.rest.temp.id] = this.rest.temp.image
      this.rest.temp.list[this.rest.temp.prv].name = this.rest.temp.pos
      this.rest.temp.list[this.rest.temp.prv].image = this.rest.temp.image
      this.rest.defreeze()
      this.posback()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertPosition() {
    this.rest.temp.action = 'insert'
    this.rest.temp.pos = ''
    this.rest.temp.image = []
  }
  
  public async checkinsertPosition() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.insertPositionSubmit()
    }
  }

  public async insertPositionCheck() {
    this.count = 0
    await this.rest.freeze('Đang tải ảnh...')
    if (!this.rest.temp.image.length) this.insertPositionSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url
          this.insertPositionSubmit()
        })
      }
      else this.insertPositionSubmit()
    });
  }

  public async insertPositionSubmit() {
    this.rest.checkpost('item-inpos', {
      pos: this.rest.temp.pos,
      image: this.rest.temp.image,
    }).then((resp) => {
      this.rest.item.image[resp.id] = resp.image
      this.rest.temp.list.push({
        name: this.rest.temp.pos,
        list: []
      })
      this.rest.defreeze()
      this.posback()
    }, () => {
      this.rest.defreeze()
    })
  }

  public insertPos(i: number) {
    this.rest.temp.action = 'inpos'
    this.rest.temp.prv = i
    this.rest.temp.name = this.rest.temp.list[i].name
    this.rest.temp.old = []
    this.rest.temp.selected = []
  }

  public insertPosItem(i: number) {
    this.rest.temp.selected.push(this.rest.temp.old[i])
  }

  public itemPosFilter() {
    this.rest.temp.old = this.rest.item.all.filter((item: any, index: number) => {
      return item.name.search(this.key) >= 0
    })
  }

  public async insertPosItemSubmit() {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('item-inpositem', {
      list: this.rest.temp.selected,
      image: this.rest.temp.image,
      posid: this.rest.temp.list[this.rest.temp.prv].id
    }).then((resp) => {
      this.rest.temp.list[this.rest.temp.prv].position = resp.list
      this.posback()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public removePosItem(i: number) {
    this.rest.temp.selected = this.rest.temp.selected.filter((item: any, index: number) => {
      return i !== index
    })
  }

  public async removePosition(index: number) {
    const alert = await this.alert.create({
      message: 'Sau khi xác nhận vị trí sẽ biến mất vĩnh viễn',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.removePositionSbumit(index)
          }
        }
      ]
    });

    await alert.present();
  }

  public async removePositionSbumit(index: number) {
    await this.rest.freeze('Đang xóa...')
    this.rest.checkpost('item-position_remove', {
      id: this.rest.temp.list[index].id,
    }).then((resp) => {
      this.rest.temp.list = this.rest.temp.list.filter((item: any, i: number) => {
        return i !== index
      })
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public posback() {
    this.rest.temp.action = 'position'
  }

  public async done(id: number) {
    const alert = await this.alert.create({
      message: 'Hàng hóa đã hết số lượng, xóa khỏi danh sách?',
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.doneSubmit(id)
          }
        }
      ]
    });

    await alert.present();
  }

  public async doneSubmit(id: number) {
    await this.rest.freeze('Đang thay đổi trạng thái')
    this.rest.checkpost('item-expire_done', {
      id: id,
    }).then((resp) => {
      this.rest.temp.list = resp.list
      this.rest.item.expired = resp.expired
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
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
    console.log(this.rest.temp);

    if (this.rest.temp.image.length == this.count) {
      this.insertSubmit()
    }
  }

  public async insertItem() {
    this.count = 0
    await this.rest.freeze('Đang tải ảnh...')
    console.log(this.rest.temp);
    
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên hàng hóa')
    else if (!this.rest.temp.code.length) this.rest.notify('Chưa nhập mã hàng hóa')
    else if (!this.rest.temp.image.length) this.insertSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkSaveSubmit()
        })
      }
      else this.checkSaveSubmit()
    });
  }

  public async insertSubmit() {
    let temp = JSON.parse(JSON.stringify(this.rest.temp))
    temp.keyword = this.rest.item.keyword    
    this.rest.checkpost('item-insert', temp).then(resp => {
      this.rest.item.list = resp.list
      this.rest.navCtrl.pop()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async checkupdateSubmit() {
    this.count++
    if (this.rest.temp.image.length == this.count) {
      this.updateSubmit()
    }
  }

  public async updateItem() {
    this.count = 0
    await this.rest.freeze('Đang tải ảnh...')
    if (!this.rest.temp.name.length) this.rest.notify('Chưa nhập tên hàng hóa')
    else if (!this.rest.temp.code.length) this.rest.notify('Chưa nhập mã hàng hóa')
    else if (!this.rest.temp.image.length) this.updateSubmit()
    else this.rest.temp.image.forEach((image: any, index: number) => {
      if (image.length > 200) {
        this.uploadImage(image).then((url: string) => {
          this.rest.temp.image[index] = url.replace('%2F', '@@')
          this.checkupdateSubmit()
        })
      }
      else this.checkupdateSubmit()
    });
  }

  public async updateSubmit() {
    let temp = JSON.parse(JSON.stringify(this.rest.temp))
    temp.keyword = this.rest.item.keyword    
    this.rest.checkpost('item-update', temp).then(resp => {
      this.rest.item.list = resp.list
      this.rest.navCtrl.pop()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public suggest() {
    this.rest.navCtrl.navigateForward('modal/suggest')
  }

  public async insertExpire() {
    await this.rest.freeze('Đang thêm...')
    let temp = JSON.parse(JSON.stringify(this.rest.temp))
    this.rest.checkpost('item-expire', temp).then(() => {
      this.rest.temp = {
        action: 'expire',
        name: '',
        code: '',
        expire: this.rest.today,
        Number: 1
      }
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public suggestItem() {
    this.rest.temp.list = this.rest.item.all.filter((item: any) => {
      return item.name.search(this.rest.temp.keyword) >= 0 || item.code.search(this.rest.temp.keyword) >= 0
    })
  }

  // public async insertPos(index: number) {
  //   const alert = await this.alert.create({
  //     message: 'Nhập vị trí',
  //     inputs: [
  //       {
  //         label: 'Vị trí',
  //         name: 'pos',
  //         value: ''
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Trở về',
  //         role: 'cancel',
  //       }, {
  //         text: 'Xác nhận',
  //         handler: (e) => {
  //           this.insertPosSubmit(index, e.pos)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // public async insertPosSubmit(index: number, pos: number) {
  //   await this.rest.freeze('Đang thêm...')
  //   let temp = JSON.parse(JSON.stringify(this.rest.temp.list[index].position))
  //   temp.push(pos)
  //   this.rest.checkpost('item-inpos', {
  //     id: this.rest.temp.list[index].id,
  //     pos: temp
  //   }).then((resp) => {
  //     this.rest.temp.list[index].position = temp
  //     // tìm kiếm dữ liệu trong rest.item.all
  //     this.rest.item.all.forEach((item: any, i: number) => {
  //       if (item.code == this.rest.temp.list[index].code) {
  //         this.rest.item.all[i].position = temp
  //       }
  //     });
  //     this.rest.defreeze()
  //   }, () => {
  //     this.rest.defreeze()
  //   })
  // }

  public async removePos(index: number, itemid: string) {
    await this.rest.freeze('Đang xóa...')
    this.rest.checkpost('item-repos', {
      itemid: itemid,
      posid: this.rest.temp.list[index].id,
    }).then((resp) => {
      this.rest.temp.list[index].position = resp.list
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }

  public async insertCat() {
    const alert = await this.alert.create({
      message: 'Nhập tên danh mục',
      inputs: [
        {
          label: 'Danh mục',
          name: 'cat',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Trở về',
          role: 'cancel',
        }, {
          text: 'Xác nhận',
          handler: (e) => {
            this.insertCatSubmit(e.cat)
          }
        }
      ]
    });

    await alert.present();
  }

  public async insertCatSubmit(cat: number) {
    await this.rest.freeze('Đang thêm...')
    this.rest.checkpost('item-incat', {
      cat: cat
    }).then((resp) => {
      this.rest.item.catlist = resp.catlist
      this.rest.temp.cat = resp.cat.toString()
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
