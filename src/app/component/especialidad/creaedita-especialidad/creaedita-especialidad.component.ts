import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-creaedita-especialidad',
  templateUrl: './creaedita-especialidad.component.html',
  styleUrls: ['./creaedita-especialidad.component.css']
})
export class CreaeditaEspecialidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  especialidad:Especialidad = new Especialidad();
  mensaje:string = "";
  id: number = 0;
  edicion: boolean = false;

  constructor(private eS:EspecialidadService,
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
      especialidad_id: ['',],
      nombreEspecialidad:['',[Validators.required, Validators.maxLength(30)]],
    })
  }



  aceptar():void{
    if(this.form.valid){
      this.especialidad.especialidad_id = this.form.value.especialidad_id;
      this.especialidad.nombreEspecialidad=this.form.value.nombreEspecialidad;
      if(this.edicion){
        this.eS.update(this.especialidad).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setlist(data);
          })
        })
      } else {
        this.eS.insert(this.especialidad).subscribe(data=>{
          this.eS.list().subscribe(data => {
            this.eS.setlist(data);
          })
        });
      }
      this.router.navigate(['/components/especialidad']);
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
      this.eS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        especialidad_id: new FormControl(data.especialidad_id),
        nombreEspecialidad: new FormControl(data.nombreEspecialidad),
        });
      });
    }
  }
}
