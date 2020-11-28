import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  public files: any
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: Observable<number>;
  // Snapshot of uploading file
  snapshot: Observable<any>;
  @ViewChild('filechooser') fileChooserElementRef: ElementRef;
  constructor(
    public rest: RestService,
    public modal: ModalController,
    public storage: AngularFireStorage
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.rest.spa.select.name.length) {
      this.rest.spa.edit.name = this.rest.spa.select.name
      this.rest.spa.edit.phone = this.rest.spa.select.phone
    }
    this.rest.spa.select.name = ''
    this.listenerInputChange();
  }

  private listenerInputChange() {
    const wireUpFileChooser = () => {
      const elementRef = this.fileChooserElementRef.nativeElement as HTMLInputElement;
      elementRef.addEventListener('change', (evt: any) => {
        const files = evt.target.files as File[];
        for (let i = 0; i < files.length; i++) {
          // reading file
          let file = files[i];


          if (file.type.split('/')[0] !== 'image') {
            this.rest.notify('Không hỗ trợ định dạng file')
            continue
          }
      
          let reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (e) => {
            let image = new Image()
            image.src = (e.target.result).toString()
            image.onload = ((e) => {
              // resize image
              // start resize
              // max pixel = 640px
              let canvas = document.createElement("canvas")
              let context = canvas.getContext('2d')

              var ratio = 1;
              const max = 640
              if (image.width > max || image.height > max) {
                if (image.width > image.height) ratio = max / image.width;
                else ratio = max / image.height;
              }
              canvas.width = image.width * ratio;
              canvas.height = image.height * ratio;
              context.drawImage(image, 0, 0, canvas.width, canvas.height);

              this.rest.spa.edit.image.push(canvas.toDataURL("image/jpeg"))
            })
          };
        }
      }, false);
    };
    wireUpFileChooser();
  }

  public remove(index: number) {
    this.rest.spa.edit.image = this.rest.spa.edit.image.filter((item, item_index) => {
      return index !== item_index
    })
  }

  public uploadImage(image: string){
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
        resolve(0)
      })
    })
  }

  public dismiss() {
    this.modal.dismiss()
  }

  public async suggest(name: string) {
    this.rest.spa.suggest = this.rest.spa.edit[name]
    this.rest.spa.suggestList = [] 
    this.rest.router.navigateByUrl('/spa/suggest')
  }

  public save() {
    if (!this.rest.spa.edit.name.length) this.rest.notify('Chưa nhập tên khách hàng')
    else if (!this.rest.spa.edit.phone.length) this.rest.notify('Chưa nhập số điện thoại khách')
    else {
      this.rest.freeze('iv', 'Đang thêm lịch spa')
      this.rest.check({
        action: 'spa-insert',
        customer: this.rest.spa.edit.name,
        phone: this.rest.spa.edit.phone,
        note: this.rest.spa.edit.note
      }).then(() => {
        this.rest.spa.edit.name = ''
        this.rest.spa.edit.phone = ''
        this.rest.spa.edit.note = ''
        this.rest.notify('Đã thêm lịch spa')
        this.rest.defreeze('iv')
      }, () => {
        this.rest.defreeze('iv')
      })
    } 
  }
}
