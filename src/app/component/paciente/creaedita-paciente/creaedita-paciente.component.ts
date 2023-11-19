import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente';
import { Users } from 'src/app/model/users';
import { PacienteService } from 'src/app/service/paciente.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-paciente',
  templateUrl: './creaedita-paciente.component.html',
  styleUrls: ['./creaedita-paciente.component.css']
})
export class CreaeditaPacienteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pacientes: Paciente = new Paciente();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaUsers: Users[] = [];
  idUserSeleccionado:number=0
  constructor(
    private pS: PacienteService,
    private uS: UsersService,
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
      id_paciente: ['',],
      user_id: ['', Validators.required],
      contacto_emergencia: ['',[Validators.required, Validators.maxLength(100)]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.pacientes.id_paciente = this.form.value.id_paciente;
      this.pacientes.user_id.id = this.form.value.user_id;
      this.pacientes.contacto_emergencia = this.form.value.contacto_emergencia;
      if(this.edicion){
        this.pS.update(this.pacientes).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setlist(data);
          })
        })
      } else {
        this.pS.insert(this.pacientes).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setlist(data);
          })
        });
      }
      this.router.navigate(['/components/pacientes'])
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

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        id_paciente: new FormControl(data.id_paciente),
        user_id: new FormControl(data.user_id.id),
        contacto_emergencia: new FormControl(data.contacto_emergencia),
        });
      });
    }
  }
}
