import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-users',
  templateUrl: './creaedita-users.component.html',
  styleUrls: ['./creaedita-users.component.css']
})
export class CreaeditaUsersComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  users:Users = new Users();
  mensaje:string = "";
  fecha_nacimiento = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  generos: { value: string; viewValue: string }[] = [
    { value: 'F', viewValue: 'Femenino' },
    { value: 'M', viewValue: 'Masculino' },]
  habilitado: { value: boolean; viewValue: string}[] = [
    { value: true, viewValue: 'Enabled' },
    { value: false, viewValue: 'Disabled' }
  ]
  paises: { value: string; viewValue: string }[] = [
    { value: 'Peru', viewValue: 'Peru' },
    { value: 'Uruguay', viewValue: 'Uruguay' },
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'Brasil', viewValue: 'Brasil' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
    { value: 'Bolivia', viewValue: 'Bolivia' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
    { value: 'Mexico', viewValue: 'Mexico' },
    { value: 'Estados Unidos', viewValue: 'USA' },
    { value: 'España', viewValue: 'España'}
  ]

  constructor(private uS:UsersService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

    this.form=this.formBuilder.group({
      id: ['',],
      username:['',Validators.required],
      password:['',Validators.required],
      enabled:['',Validators.required],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      genero:['',Validators.required],
      fecha_nacimiento:['',Validators.required],
      dni:['',Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono:['',Validators.required],
      pais_de_origen:['',Validators.required],
      direccion: ['', Validators.required],
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.users.id = this.form.value.id;
      this.users.username = this.form.value.username;
      this.users.password = this.form.value.password;
      this.users.enabled = this.form.value.enabled;
      this.users.nombre = this.form.value.nombre;
      this.users.apellido = this.form.value.apellido;
      this.users.genero = this.form.value.genero;
      this.users.fecha_nacimiento = this.form.value.fecha_nacimiento;
      this.users.dni = this.form.value.dni;
      this.users.correo_electronico = this.form.value.correo_electronico;
      this.users.telefono = this.form.value.telefono;
      this.users.pais_de_origen = this.form.value.pais_de_origen;
      this.users.direccion = this.form.value.direccion;
      if(this.edicion){
        this.uS.update(this.users).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          })
        })
      } else {
        this.uS.insert(this.users).subscribe(data=>{
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          })
        });
      }
      this.router.navigate(['users']);
    }
    else {
      this.mensaje = 'Complete todos los campos, revise!!'
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        id: new FormControl(data.id),
        username: new FormControl(data.username),
        password: new FormControl(data.password),
        enabled: new FormControl(data.enabled),
        nombre: new FormControl(data.nombre),
        apellido: new FormControl(data.apellido),
        genero: new FormControl(data.genero),
        fecha_nacimiento: new FormControl(data.fecha_nacimiento),
        dni: new FormControl(data.dni),
        correo_electronico: new FormControl(data.correo_electronico),
        telefono: new FormControl(data.telefono),
        pais_de_origen: new FormControl(data.pais_de_origen),
        direccion: new FormControl(data.direccion),
        });
      });
    }
  }
}
