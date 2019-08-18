import { Component, OnInit } from '@angular/core';
import { BackendService } from 'services/backend.service'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ArchivosService } from 'services/archivos.service'
import { clean, format, validate } from 'rut.js';

@Component({
  selector: 'app-parvulos',
  templateUrl: './parvulos.component.html',
  styleUrls: ['./parvulos.component.sass'],
  providers: [BackendService, NgbModalConfig, NgbModal, ArchivosService]

})
export class ParvulosComponent implements OnInit {
  lista = []
  listaApo = []
  parvuloForm: any
  form = {}
  parvulo
  tipo
  titulo = ""
  default = { 'rut': '', 'nombre': '', 'direccion': '', 'apoderado1': '', 'apoderado2': '' }

  constructor(config: NgbModalConfig, private backendSrv: BackendService, private modalService: NgbModal, private archivoSrv: ArchivosService, private formBuilder: FormBuilder) {
    //modales config
    config.backdrop = 'static';
    config.keyboard = false;
    //formulario parvulos
    this.parvuloForm = this.formBuilder.group({
      'rut': ['', Validators.required],
      'nombre': ['', [Validators.required]],
      'direccion': ['', [Validators.required]],
      'apoderado1': ['', [Validators.required]],
      'apoderado2': ['', [Validators.required]],
      'id_institucion': ['1'],
    });
  }

  ngOnInit() {
    this.actualizar().subscribe(result => {
      console.log("goli", result)
    })
    this.actualizarApo().subscribe

  }
  actualizar() {
    let obs = this.backendSrv.get(this.backendSrv.baseUrl + 'children')
    obs.subscribe(result => {
      this.lista = result
    })
    return obs
  }
  actualizarApo() {
    let obs = this.backendSrv.get(this.backendSrv.baseUrl + 'usuario')
    obs.subscribe(result => {
      this.listaApo = result
    })
    return obs
  }
  obtenerApo(string) {
    for (let dato of this.listaApo) {
      if (dato.nombre == string) {
        return dato.id
      }
    }
  }


  open(content, tipo, dato) {
    this.tipo = tipo
    console.log("soy el tipo", tipo)
    console.log("el this.tipo", this.tipo)
    if (tipo == "nuevo") {
      this.archivoSrv.aux = ['', '', '', '']
      this.parvuloForm.patchValue(this.default)
      this.titulo = "Nuevo Parvulo"
    }
    else {
      this.titulo = "Editar Parvulo"
      this.obtenerParvulo(dato).subscribe(result => {
        result[0]['apoderado2'] = result[1].apoderado1
        this.parvulo = result[0]
        this.parvuloForm.patchValue(result[0])
        this.archivoSrv.aux[1] = this.parvulo.fotografia
        this.archivoSrv.aux[2] = this.parvulo.certificado_N
        this.archivoSrv.aux[3] = this.parvulo.certificado_V
        this.archivoSrv.aux[4] = this.parvulo.certificado_P

      })
    }
    this.modalService.open(content);
  }


  obtenerParvulo(id) {
    let obs = this.backendSrv.post(this.backendSrv.baseUrl + 'children/' + id.id, id)
    obs.subscribe(result => {
    })
    return obs;
  }

  send() {
    this.form = this.parvuloForm.value
    if (this.validator() && validate(this.parvuloForm.value.rut)) {
      if (this.tipo == "nuevo") {
        let id_apo = this.obtenerApo(this.form['apoderado1'])
        let id_apo2 = this.obtenerApo(this.form['apoderado2'])
        this.form['fotografia'] = this.archivoSrv.aux[1]
        this.form['certificado_N'] = this.archivoSrv.aux[2]
        this.form['certificado_V'] = this.archivoSrv.aux[3]
        this.form['certificado_P'] = this.archivoSrv.aux[4]
        this.form['apoderado1'] = id_apo
        this.form['apoderado2'] = id_apo2
        console.log("papichulo 2", this.form)
        this.backendSrv.post(this.backendSrv.baseUrl + 'children', this.form)
          .subscribe(hero => {
            this.actualizar().subscribe
            window.alert("Agregaste correctamente al Parvulo")
            this.modalService.dismissAll()
          })
      }
      else {
        this.form['id'] = this.parvulo.id
        this.form['fotografia'] = this.archivoSrv.aux[1]
        this.form['certificado_N'] = this.archivoSrv.aux[2]
        this.form['certificado_V'] = this.archivoSrv.aux[3]
        this.form['certificado_P'] = this.archivoSrv.aux[4]

        console.log("form", this.form)
        this.backendSrv.put(this.backendSrv.baseUrl + 'children/' + this.parvulo.id, this.form).subscribe(hero => {
          this.actualizar().subscribe
          this.modalService.dismissAll()
          window.alert("Editaste correctamente al Parvulo")
        });
      }

    }

  }
  borrar(id) {
    console.log("id", id)
    let obs = this.backendSrv.del(this.backendSrv.baseUrl + 'children/' + id.id, id)
    obs.subscribe(result => {
      this.actualizar().subscribe
      this.actualizarApo().subscribe

    })
  }
  validator() {
    /* falta lo del rut */
    if (this.parvuloForm.valid) {
      if (this.archivoSrv.aux[1] && this.archivoSrv.aux[2] && this.archivoSrv.aux[3] && this.archivoSrv.aux[4]) {
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


