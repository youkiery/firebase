import { Injectable } from '@angular/core';
// import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photo: string = '';
  public max = 640;
  constructor() { }
  
  // public async getPermisson() {
  //   return new Promise((resolve) => {
  //     Camera.checkPermissions().then(data => {
  //       console.log(data);
  //       if (data.camera != 'granted') {
  //         Camera.requestPermissions({
  //           permissions: ['camera']
  //         }).then((data2) => {
  //           console.log(data2);
  //           resolve(true)
  //         }, () => {
  //           resolve(true)
  //         })
  //       }
  //       else resolve(true)
  //     })
  //   })
  // }

  // public async addNewToGallery() {
  //   await this.getPermisson()
  //   console.log(2);
  //   // Take a photo
  //   const capturedPhoto = await Camera.getPhoto({
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Camera,
  //     quality: 100
  //   })
    
  //   this.photo = 'data:image/png;base64,' + capturedPhoto.base64String
  //   this.resize()
  // }

  public async resize(base64: string = '') {
    let image = new Image();
    image.src = base64
    image.onload = (e) => {
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
  
      return canvas.toDataURL('image/jpeg') 
    }
  }
}
