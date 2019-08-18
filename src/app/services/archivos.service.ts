import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  file: File;
  aux = ['', '', '', '']
  seleccionado: FileList

  constructor(private afStorage: AngularFireStorage) {
  }

  choseefile(event, user, tipo) {
    this.aux[tipo] = ''
    this.seleccionado = event.target.files;
    if (this.seleccionado.item(0)) this.upload(user, tipo)
  }
  upload(user, tipo) {
    let file = this.seleccionado.item(0);
    let key = 'archivo' + Math.floor(Math.random() * 10000000);
    let ruta = '/' + user + '/' + key
    const subidaTask = this.afStorage.upload(ruta, file)
    console.log("subidaa", subidaTask)
    subidaTask.then(result => {
      result.ref.getDownloadURL().then(url => {
        switch (tipo) {
          case 1:
            this.aux[tipo] = url
            console.log("entre en la primera", url)
            break;
          case 2:
            this.aux[tipo] = url
            console.log("entre en la segunda", url)
            break;
          case 3:
            this.aux[tipo] = url
            console.log("entre en la tercera", url)
            break;
          case 4:
            this.aux[tipo] = url
            console.log("entre en la cuarta", url)
            break;
          default:
            console.log("entraaaa acaaa")

        }
      })
    })
    /* 
        subidaTask.snapshotChanges().pipe(
          finalize(() =>
            this.afStorage.oe(ruta).getDownloadURL().subscribe(ref => {
              console.log("ref", ref)
              switch (tipo) {
                case 1:
                  this.url = ref
                  this.aux[tipo] = this.url
                  console.log("entre en la primera", this.url)
                  break;
                case 2:
                  this.url2 = ref
                  this.aux[tipo] = this.url2
                  console.log("entre en la segunda", this.url2)
                  break;
                case 3:
                  this.url3 = ref
                  this.aux[tipo] = this.url3
                  console.log("entre en la tercera", this.url3)
                  break;
                case 4:
                  this.url4 = ref
                  this.aux[tipo] = this.url4
                  console.log("entre en la cuarta", this.url4)
                  break;
                default:
                  console.log("entraaaa acaaa")
    
              }
            }))
        ) */
  }
}