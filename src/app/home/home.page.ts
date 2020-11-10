import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  files: []
  items: Observable<any[]>;
  images: string[] = []
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: Observable<number>;
  // Snapshot of uploading file
  snapshot: Observable<any>;
  @ViewChild('filechooser') fileChooserElementRef: ElementRef;
  constructor(
    private storage: AngularFireStorage
  ) {

  }

  ionViewDidEnter() {
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
            console.log('Không hỗ trợ định dạng file')
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

              this.images.push(canvas.toDataURL("image/jpeg"))
            })
          };
        }
      }, false);
    };
    wireUpFileChooser();
  }

  public remove(index: number) {
    this.images = this.images.filter((item, item_index) => {
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

  public save() {
    let list = []
    let check = 0
    
    new Promise(resolve => {
      if (!this.images.length) {
        resolve()
      }        
      else {
        console.log(this.images.length);
        this.images.forEach((item) => {
          // check if base64 data
          if (item.length) {
            check ++
            // not empty string
            if (item.length < 200) {
              // not base64
              check --
              item = item.replace(/&/g, '[amp]')
              item = item.replace(/%2F/g, '[/]')
              list.push(item)
              console.log(check);
              if (!check) {
                resolve()
              }
            }
            else {
              // upload file
              this.uploadImage(item).then((data: string) => {
                check --
                if (data) {
                  console.log(data);
                  data = data.replace(/&/g, '[amp]')
                  data = data.replace(/%2F/g, '[/]')
                  list.push(data)
                }
                // uncomment if get formated data
                if (!check) {
                  resolve()
                }
              })
            }
          }
        });
        if (!check) {
          resolve()
        }
      }
    }).then((data) => {
      // return 0 if overrange process (0 - 100)
      console.log(list);
      
    })
  }

  ngOnInit() {
    // firestore.CollectionReference
    // var listRef = storageRef.child('files/uid');

    // // Find all the prefixes and items.
    // listRef.listAll().then(function(res) {
    //   res.prefixes.forEach(function(folderRef) {
    //     // All the prefixes under listRef.
    //     // You may call listAll() recursively on them.
    //   });
    //   res.items.forEach(function(itemRef) {
    //     // All the items under listRef.
    //   });
    // }).catch(function(error) {
    //   // Uh-oh, an error occurred!
    // });
  }
}
