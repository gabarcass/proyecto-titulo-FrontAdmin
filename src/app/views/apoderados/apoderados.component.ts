import { Component, OnInit } from '@angular/core';
import { BackendService } from 'services/backend.service'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchivosService } from 'services/archivos.service'
import { FormBuilder, Validators } from '@angular/forms';
import { clean, format, validate } from 'rut.js';


@Component({
  selector: 'app-apoderados',
  templateUrl: './apoderados.component.html',
  styleUrls: ['./apoderados.component.sass'],
  providers: [BackendService, NgbModalConfig, NgbModal, ArchivosService]
})
export class ApoderadosComponent implements OnInit {
  lista = []
  apoderadoForm: any
  titulo = ""
  form = {}
  apoderado
  tipo
  default = { 'rut': '', 'nombre': '', 'direccion': '', 'correo': '', 'telefono': '', 'situacion_c': '', 'parentesco': '' }

  constructor(config: NgbModalConfig, private backendSrv: BackendService, private modalService: NgbModal, private archivoSrv: ArchivosService, private formBuilder: FormBuilder) {
    //modales config
    config.backdrop = 'static';
    config.keyboard = false;
    //formulario apoderado
    this.apoderadoForm = this.formBuilder.group({
      'rut': ['', Validators.required],
      'nombre': ['', [Validators.required]],
      'direccion': ['', [Validators.required]],
      'correo': ['', [Validators.required, Validators.email]],
      'telefono': ['', [Validators.required, Validators.max(999999999), Validators.min(100000000)]],
      'situacion_c': ['', [Validators.required]],
      'parentesco': ['', [Validators.required]],
      'id_institucion': ['1'],
    });
  }

  ngOnInit() {
    this.actualizar().subscribe
  }
  actualizar() {
    let obs = this.backendSrv.get(this.backendSrv.baseUrl + 'usuario')
    obs.subscribe(result => {
      this.lista = result
    })
    return obs
  }
  open(content, tipo, dato) {
    this.tipo = tipo
    if (tipo == "nuevo") {
      this.archivoSrv.aux = ['', '', '', '']
      this.apoderadoForm.patchValue(this.default)
      this.titulo = "Nuevo Apoderado"
    }
    else {
      this.titulo = "Editar Apoderado"
      this.obtenerApoderado(dato).subscribe(result => {
        console.log(result)
        this.apoderadoForm.patchValue(result[0])
        this.apoderado = result[0]
        this.archivoSrv.aux[1] = this.apoderado.fotografia
      })
    }
    this.modalService.open(content);
  }

  send() {
    this.form = this.apoderadoForm.value
    if (this.validator()) {
      if (this.tipo == "nuevo") {
        this.form['fotografia'] = this.archivoSrv.aux[1]
        console.log(this.form)
        this.backendSrv.post(this.backendSrv.baseUrl + 'usuario', this.form)
          .subscribe(hero => {
            this.actualizar().subscribe
            window.alert("Agregaste correctamente al Apoderado")
            this.modalService.dismissAll()
          })
      }
      else {
        this.form['id'] = this.apoderado.id
        this.form['fotografia'] = this.archivoSrv.aux[1]
        this.backendSrv.put(this.backendSrv.baseUrl + 'usuario/' + this.apoderado.id, this.form).subscribe(hero => {
          this.actualizar().subscribe
          this.modalService.dismissAll()
          window.alert("Editaste correctamente al Apoderado")
        });
      }
    }

  }

  obtenerApoderado(id) {
    let obs = this.backendSrv.post(this.backendSrv.baseUrl + 'usuario/' + id.id, id)
    obs.subscribe(result => {
    })
    return obs;
  }
  borrar(id) {
    console.log("id", id)
    let obs = this.backendSrv.del(this.backendSrv.baseUrl + 'usuario/' + id.id, id)
    obs.subscribe(result => {
      this.actualizar().subscribe
    })
  }
  validator() {
    /* falta lo del rut */
    if (this.apoderadoForm.valid && validate(this.apoderadoForm.value.rut)) {
      if (this.archivoSrv.aux[1]) {
        return true
      }
      else {
        alert("Debe agregar una fotografía")
        return false
      }
    } else {
      alert("Revise los campos ingresados")
      return false
    }
  }
}
