import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private eS:EspecialidadService, private router:Router, private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre_especialidad:['',Validators.required],
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.especialidad.nombre_especialidad=this.form.value.nombre_especialidad;
      this.eS.insert(this.especialidad).subscribe(data=>{
        this.eS.list().subscribe(data => {
          this.eS.setlist(data);
        })
      });
      this.router.navigate(['especialidad']);
    }
    else {
      this.mensaje = 'Complete todos los campos, revise!!'
    }
  }
}
