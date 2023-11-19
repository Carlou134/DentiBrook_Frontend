import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Odontologo } from 'src/app/model/odontologo';
import { Paciente } from 'src/app/model/paciente';
import { Reputacion } from 'src/app/model/reputacion';
import { OdontologoService } from 'src/app/service/odontologo.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { ReputacionService } from 'src/app/service/reputacion.service';

@Component({
  selector: 'app-creaedita-reputacion',
  templateUrl: './creaedita-reputacion.component.html',
  styleUrls: ['./creaedita-reputacion.component.css']
})
export class CreaeditaReputacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reputacion: Reputacion=new Reputacion();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaOdontologos: Odontologo[] = [];
  idOdontologoSeleccionado:number=0
  listaPacientes: Paciente[] = [];
  idPacienteSeleccionado:number=0;

  constructor(
    private rS: ReputacionService,
    private oS: OdontologoService,
    private pS: PacienteService,
    private router: Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      reputacion_id: ['',],
      odontologo_id: ['', Validators.required],
      paciente_id: ['', Validators.required],
      comentario: ['',[Validators.required, Validators.maxLength(200)]],
      estrellas: ['', [Validators.required, this.validateNumero]],
    });

    this.oS.list().subscribe((data) => {
      this.listaOdontologos = data;
    });

    this.pS.list().subscribe((data) => {
      this.listaPacientes = data;
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.reputacion.reputacion_id = this.form.value.reputacion_id;
      this.reputacion.odontologo_id.odontologo_id = this.form.value.odontologo_id;
      this.reputacion.paciente_id.id_paciente = this.form.value.paciente_id;
      this.reputacion.comentario = this.form.value.comentario;
      this.reputacion.estrellas = this.form.value.estrellas;
      if(this.edicion){
        this.rS.update(this.reputacion).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setlist(data);
          })
        })
      } else {
        this.rS.insert(this.reputacion).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setlist(data);
          })
        });
      }
      this.router.navigate(['/components/reputacion'])
    } else {
      this.mensaje='Ingrese todos los campos!!'
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  validateDecimal(control: AbstractControl) {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return { required: true }; // Indicar que el campo es obligatorio
    }

    const numericValue = Number(value);

    if (isNaN(numericValue) || numericValue < 0) {
      return { invalidDecimal: true, negativeValue: true }; // Indicar que el valor no es un número válido o es negativo
    }

    return null; // El valor es válido
  }

  validateNumero(control: AbstractControl) {
    const value = control.value;

    if (value === null || value === undefined) {
      return null; // Permitir valores nulos o indefinidos
    }

    // Convertir el valor a un número
    const numericValue = parseInt(value, 10);

    // Verificar si el valor es un número entero
    if (!Number.isInteger(numericValue)) {
      return { invalidInteger: true }; // Devolver un error si no es un número entero
    }

    // Verificar si el valor está en el rango del 1 al 100
    if (numericValue < 1 || numericValue > 5) {
      return { outOfRange: true }; // Devolver un error si está fuera del rango
    }

    return null; // El valor es válido
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        reputacion_id: new FormControl(data.reputacion_id),
        odontologo_id: new FormControl(data.odontologo_id.odontologo_id),
        paciente_id: new FormControl(data.paciente_id.id_paciente),
        comentario: new FormControl(data.comentario),
        estrellas: new FormControl(data.estrellas),
        });
      });
    }
  }
}
