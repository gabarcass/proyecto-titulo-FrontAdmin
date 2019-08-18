import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from 'services/backend.service'
import { FormBuilder, Validators } from '@angular/forms';
import { ArchivosService } from 'services/archivos.service'
import { clean, format, validate } from 'rut.js';

@Component({
  selector: 'app-parvularios',
  templateUrl: './parvularios.component.html',
  styleUrls: ['./parvularios.component.sass'],
  providers: [BackendService, NgbModalConfig, NgbModal, ArchivosService]

})
export class ParvulariosComponent implements OnInit {
  lista = []
  parvularioForm: any
  form = {}
  titulo = ""
  parvulario
  tipo
  default = { 'rut': '', 'nombre': '', 'direccion': '', 'correo': '', 'telefono': '', 'lugar_estudios': '' }

  constructor(config: NgbModalConfig, private backendSrv: BackendService, private modalService: NgbModal, private archivoSrv: ArchivosService, private formBuilder: FormBuilder) {
    //modales config
    config.backdrop = 'static';
    config.keyboard = false;
    //formulario parvulario
    this.parvularioForm = this.formBuilder.group({
      'rut': ['', Validators.required],
      'nombre': ['', [Validators.required]],
      'direccion': ['', [Validators.required]],
      'correo': ['', [Validators.required, Validators.email]],
      'telefono': ['', [Validators.required, Validators.minLength(9)]],
      'lugar_estudios': ['', [Validators.required]],
      'id_institucion': ['1'],
    });
  }

  ngOnInit() {
    this.actualizar().subscribe
  }

  actualizar() {
    let obs = this.backendSrv.get(this.backendSrv.baseUrl + 'teacher')
    obs.subscribe(result => {
      this.lista = result
    })
    return obs
  }
  open(content, tipo, dato) {
    this.tipo = tipo
    console.log("soy el tipo", tipo)
    console.log("el this.tipo", this.tipo)
    if (tipo == "nuevo") {
      this.archivoSrv.aux = ['', '', '', '']
      this.parvularioForm.patchValue(this.default)
      this.titulo = "Nuevo Parvulario"
    }
    else {
      this.titulo = "Editar Parvulario"
      this.obtenerParvulario(dato).subscribe(result => {
        this.parvularioForm.patchValue(result[0])
        this.parvulario = result[0]
        console.log('raro', this.parvulario)
        this.archivoSrv.aux[1] = this.parvulario.fotografia
        this.archivoSrv.aux[2] = this.parvulario.certificado_antecedentes
        this.archivoSrv.aux[3] = this.parvulario.certificado_in
      })
    }
    this.modalService.open(content);
  }


  send() {
    this.form = this.parvularioForm.value
    if (this.validator()) {
      if (this.tipo == "nuevo") {
        this.form['fotografia'] = this.archivoSrv.aux[1]
        this.form['certificado_antecedentes'] = this.archivoSrv.aux[2]
        this.form['certificado_in'] = this.archivoSrv.aux[3]
        this.backendSrv.post(this.backendSrv.baseUrl + 'teacher', this.form)
          .subscribe(hero => {
            this.actualizar().subscribe
            window.alert("Agregaste correctamente al parvulario")
            this.modalService.dismissAll()
          })
      }
      else {
        this.form['id'] = this.parvulario.id
        this.form['fotografia'] = this.archivoSrv.aux[1]
        this.form['certificado_antecedentes'] = this.archivoSrv.aux[2]
        console.log("in", this.form)
        this.form['certificado_in'] = this.archivoSrv.aux[3]
        console.log("form", this.form)
        this.backendSrv.put(this.backendSrv.baseUrl + 'teacher/' + this.parvulario.id, this.form).subscribe(hero => {
          this.actualizar().subscribe
          this.modalService.dismissAll()
          window.alert("Editaste correctamente al parvulario")
        });
      }
    }

  }

  obtenerParvulario(id) {
    let obs = this.backendSrv.post(this.backendSrv.baseUrl + 'teacher/' + id.id, id)
    obs.subscribe(result => {
    })
    return obs;
  }
  borrar(id) {
    console.log("id", id)
    let obs = this.backendSrv.del(this.backendSrv.baseUrl + 'teacher/' + id.id, id)
    obs.subscribe(result => {
      this.actualizar().subscribe

    })
  }

  validator() {
    /* falta lo del rut */
    if (this.parvularioForm.valid && validate(this.parvularioForm.value.rut)) {
      if (this.archivoSrv.aux[1] && this.archivoSrv.aux[2] && this.archivoSrv.aux[3]) {
        return true
      }
      else {
        alert("Debe agregar los archivos solicitados")
        return false
      }
    } else {
      alert("Revise los campos ingresados")
      return false
    }
  }
}


