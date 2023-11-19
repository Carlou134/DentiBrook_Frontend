import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Cita } from 'src/app/model/cita';
import { Odontologo } from 'src/app/model/odontologo';
import { Paciente } from 'src/app/model/paciente';
import { Servicio } from 'src/app/model/servicio';
import { Tipo_Pago } from 'src/app/model/tipo_pago';
import { CitaService } from 'src/app/service/cita.service';
import { OdontologoService } from 'src/app/service/odontologo.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { TipoPagoService } from 'src/app/service/tipo-pago.service';

@Component({
  selector: 'app-creaedita-cita',
  templateUrl: './creaedita-cita.component.html',
  styleUrls: ['./creaedita-cita.component.css']
})
export class CreaeditaCitaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cita: Cita=new Cita();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaPaciente: Paciente[] = [];
  idPacienteSeleccionado:number=0
  listaOdontologo: Odontologo[] = [];
  idOdontologoSeleccionado:number=0;
  listaServicio: Servicio[] = [];
  idServicioSeleccionado:number=0;
  listaTipoPago: Tipo_Pago[] = [];
  idTipoPagoSeleccionado:number=0;
  fecha = new FormControl(new Date());
  minFecha: Date = moment().add(1, 'days').toDate();

  constructor(
    private cS: CitaService,
    private pS: PacienteService,
    private oS: OdontologoService,
    private sS: ServicioService,
    private tS: TipoPagoService,
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
      cita_id: ['',],
      paciente_id: ['', Validators.required],
      odontologo_id: ['', Validators.required],
      servicio_id: ['', Validators.required],
      tipo_pago_id: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['',[Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9:-]+$/)]],
      duracion_en_horas: ['', [Validators.required, this.validateNumero]],
      motivo: ['',[Validators.required, Validators.maxLength(100)]],
      estado: ['',[Validators.required, Validators.maxLength(10)]],
      direccion_consultorio: ['',[Validators.required, Validators.maxLength(30)]],
      tipo_cita: ['',[Validators.required, Validators.maxLength(10)]],
    });

    this.pS.list().subscribe((data) => {
      this.listaPaciente = data;
    });

    this.oS.list().subscribe((data) => {
      this.listaOdontologo = data;
    })

    this.sS.list().subscribe((data) => {
      this.listaServicio = data;
    })

    this.tS.list().subscribe((data) => {
      this.listaTipoPago = data;
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.cita.cita_id = this.form.value.cita_id;
      this.cita.paciente_id.id_paciente = this.form.value.paciente_id;
      this.cita.odontologo_id.odontologo_id = this.form.value.odontologo_id;
      this.cita.servicio_id.id = this.form.value.servicio_id;
      this.cita.tipo_pago_id.tipo_pago_id = this.form.value.tipo_pago_id;
      this.cita.fecha = this.form.value.fecha;
      this.cita.hora = this.form.value.hora;
      this.cita.duracion_en_horas = this.form.value.duracion_en_horas;
      this.cita.motivo = this.form.value.motivo;
      this.cita.estado = this.form.value.estado;
      this.cita.direccion_consultorio = this.form.value.direccion_consultorio;
      this.cita.tipo_cita = this.form.value.tipo_cita;
      if(this.edicion){
        this.cS.update(this.cita).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          })
        })
      } else {
        this.cS.insert(this.cita).subscribe(data=>{
          this.cS.list().subscribe(data=>{
            this.cS.setList(data);
          })
        });
      }
      this.router.navigate(['/components/citas'])
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
    if (numericValue < 1) {
      return { outOfRange: true }; // Devolver un error si está fuera del rango
    }

    return null; // El valor es válido
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        cita_id: new FormControl(data.cita_id),
        paciente_id: new FormControl(data.paciente_id.id_paciente),
        odontologo_id: new FormControl(data.odontologo_id.odontologo_id),
        servicio_id: new FormControl(data.servicio_id.id),
        tipo_pago_id: new FormControl(data.tipo_pago_id.tipo_pago_id),
        fecha: new FormControl(data.fecha),
        hora: new FormControl(data.hora),
        duracion_en_horas: new FormControl(data.duracion_en_horas),
        motivo: new FormControl(data.motivo),
        estado: new FormControl(data.estado),
        direccion_consultorio: new FormControl(data.direccion_consultorio),
        tipo_cita: new FormControl(data.tipo_cita),
        });
      });
    }
  }
}
