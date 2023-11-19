import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Especialidad } from 'src/app/model/especialidad';
import { Odontologo } from 'src/app/model/odontologo';
import { Users } from 'src/app/model/users';
import { EspecialidadService } from 'src/app/service/especialidad.service';
import { OdontologoService } from 'src/app/service/odontologo.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-odontologo',
  templateUrl: './creaedita-odontologo.component.html',
  styleUrls: ['./creaedita-odontologo.component.css']
})
export class CreaeditaOdontologoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  odontologo: Odontologo=new Odontologo();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaUsers: Users[] = [];
  idUserSeleccionado:number=0
  listaEspecialidad: Especialidad[] = [];
  idEspecialidadSeleccionado:number=0;
  educacion:{value:string,viewValue:string}[]=[{value:'Completa',viewValue:'Completa'},
  {value:'Parcial',viewValue:'Parcial'}, {value:'Secundaria Completa',viewValue:'Secundaria Completa'},
  {value:'Practicante',viewValue:'Practicante'}, {value:'Licenciado',viewValue:'Licenciado'},
  {value:'Maestro',viewValue:'Maestro'}, {value:'Doctor',viewValue:'Doctor'}]

  constructor(
    private oS: OdontologoService,
    private uS: UsersService,
    private eS: EspecialidadService,
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
      odontologo_id: ['',],
      user_id: ['', Validators.required],
      especialidad_id: ['', Validators.required],
      experiencia_laboral_anios: ['', [Validators.required, this.validateNumero]],
      educacion_universitaria: ['',[Validators.required, Validators.maxLength(30)]],
      historial_pacientes: ['', [Validators.required, this.validateNumero]],
      horario_atencion: ['',[Validators.required, Validators.maxLength(100), Validators.pattern(/^[0-9:-]+$/)]],
      salario: ['', [Validators.required, this.validateDecimal]],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });

    this.eS.list().subscribe((data) => {
      this.listaEspecialidad = data;
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.odontologo.odontologo_id = this.form.value.odontologo_id;
      this.odontologo.user_id.id = this.form.value.user_id;
      this.odontologo.especialidad_id.especialidad_id = this.form.value.especialidad_id;
      this.odontologo.experiencia_laboral_anios = this.form.value.experiencia_laboral_anios;
      this.odontologo.educacion_universitaria = this.form.value.educacion_universitaria;
      this.odontologo.historial_pacientes = this.form.value.historial_pacientes;
      this.odontologo.horario_atencion = this.form.value.horario_atencion;
      this.odontologo.salario = this.form.value.salario;
      if(this.edicion){
        this.oS.update(this.odontologo).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setlist(data);
          })
        })
      } else {
        this.oS.insert(this.odontologo).subscribe(data=>{
          this.oS.list().subscribe(data=>{
            this.oS.setlist(data);
          })
        });
      }
      this.router.navigate(['/components/odontologo'])
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
    if (numericValue < 1) {
      return { outOfRange: true }; // Devolver un error si está fuera del rango
    }

    return null; // El valor es válido
  }

  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        odontologo_id: new FormControl(data.odontologo_id),
        user_id: new FormControl(data.user_id.id),
        especialidad_id: new FormControl(data.especialidad_id.especialidad_id),
        experiencia_laboral_anios: new FormControl(data.experiencia_laboral_anios),
        educacion_universitaria: new FormControl(data.educacion_universitaria),
        historial_pacientes: new FormControl(data.historial_pacientes),
        horario_atencion: new FormControl(data.horario_atencion),
        salario: new FormControl(data.salario),
        });
      });
    }
  }
}
