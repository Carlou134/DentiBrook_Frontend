import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Role } from 'src/app/model/roles';
import { Users } from 'src/app/model/users';
import { RolesService } from 'src/app/service/roles.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-roles',
  templateUrl: './creaedita-roles.component.html',
  styleUrls: ['./creaedita-roles.component.css']
})
export class CreaeditaRolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  roles: Role = new Role();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  tipos: { value: string; viewValue: string }[] = [
    { value: 'USER', viewValue: 'User' },
    { value: 'ODONTOLOGO', viewValue: 'Odontologo' }
  ];
  listaUsers: Users[] = [];
  idUserSeleccionado:number=0
  constructor(
    private rS: RolesService,
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
      id: ['',],
      rol: ['', Validators.required],
      user: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.roles.id = this.form.value.id;
      this.roles.rol = this.form.value.rol;
      this.roles.user.id = this.form.value.user;
      if(this.edicion){
        this.rS.update(this.roles).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          })
        })
      } else {
        this.rS.insert(this.roles).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data);
          })
        });
      }
      this.router.navigate(['roles'])
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
      this.rS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        id: new FormControl(data.id),
        rol: new FormControl(data.rol),
        user: new FormControl(data.user.id),
        });
      });
    }
  }
}
