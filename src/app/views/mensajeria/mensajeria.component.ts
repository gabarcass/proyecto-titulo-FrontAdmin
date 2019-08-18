import { Component, OnInit } from '@angular/core';
import { BackendService } from 'services/backend.service'
import { FormBuilder, Validators } from '@angular/forms';
import { ArchivosService } from 'services/archivos.service'
@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.sass'],
  providers: [BackendService, ArchivosService]
})
export class MensajeriaComponent implements OnInit {
  mensajeForm
  listaApo = ''
  listaPar = ''
  form
  default = { 'asunto': '', 'destinatarios': '', 'mensaje': '' }

  constructor(private backendSrv: BackendService, private archivoSrv: ArchivosService, private formBuilder: FormBuilder) {
    this.mensajeForm = this.formBuilder.group({
      'asunto': ['', Validators.required],
      'destinatarios': ['', [Validators.required]],
      'mensaje': ['', [Validators.required]],

    });


  }
  ngOnInit() {
    this.actualizar().subscribe
    this.actualizarApo().subscribe
  }
  actualizar() {
    let obs = this.backendSrv.get(this.backendSrv.baseUrl + 'teacher')
    obs.subscribe(result => {
      this.listaPar = ''
      for (let correo in result) {
        if (this.listaPar == '') {
          this.listaPar = (result[correo].correo)
        } else {
          this.listaPar = this.listaPar + ',' + (result[correo].correo)
        }
      }
    })
    return obs
  }
  actualizarApo() {
    let obs = this.backendSrv.get(this.backendSrv.baseUrl + 'usuario')
    obs.subscribe(result => {
      this.listaApo = ''
      console.log("result", result)
      for (let correo in result) {
        if (this.listaApo == '') {
          this.listaApo = (result[correo].correo)
        } else {
          this.listaApo = this.listaApo + ',' + (result[correo].correo)
        }
      }
    })
    return obs
  }

  send() {
    this.form = this.mensajeForm.value
    if (this.validator()) {
      if (this.mensajeForm.value.destinatarios == 'Parvularios') {
        this.form['destinatarios'] = this.listaPar
        this.backendSrv.post(this.backendSrv.baseUrl + 'admin/mensajeria', this.form)
          .subscribe(result => {
            window.alert("Correo enviado a " + this.form.destinatarios)
            this.mensajeForm.patchValue(this.default)

          })
      }
      if (this.mensajeForm.value.destinatarios == 'Apoderados') {
        console.log("que paaaaasaaa")
        this.form['destinatarios'] = this.listaApo
        console.log("correos", this.listaApo)
        this.backendSrv.post(this.backendSrv.baseUrl + 'admin/mensajeria', this.form)
          .subscribe(result => {
            window.alert("Correo enviado a " + this.form.destinatarios)
            this.mensajeForm.patchValue(this.default)
          })
      }
    }
    console.log(this.form)


  }
  validator() {
    if (this.mensajeForm.valid) {
      return true
    } else {
      alert("Ingrese todos los campos")
      return false
    }
  }
}
