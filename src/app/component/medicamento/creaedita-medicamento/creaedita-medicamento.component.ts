import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-creaedita-medicamento',
  templateUrl: './creaedita-medicamento.component.html',
  styleUrls: ['./creaedita-medicamento.component.css']
})
export class CreaeditaMedicamentoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  medicamento:Medicamento = new Medicamento();
  mensaje:string = "";
  maxFecha:Date = moment().add(-1,'days').toDate();
  vias:{value:string,viewValue:string}[]=[{value:'Oral', viewValue: 'Oral'},
  {value:'Sublingual', viewValue: 'Sublingual'}]
  constructor(private mS:MedicamentoService, private router:Router, private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:['',Validators.required],
      forma_farmaceutica:['',Validators.required],
      via:['',Validators.required],
      fecha_caducidad:['',Validators.required],
      precio:['',Validators.required]
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.medicamento.nombre=this.form.value.nombre;
      this.medicamento.forma_farmaceutica=this.form.value.forma_farmaceutica;
      this.medicamento.via=this.form.value.via;
      this.medicamento.fecha_caducidad=this.form.value.fecha_caducidad;
      this.medicamento.precio=this.form.value.precio;

      this.mS.insert(this.medicamento).subscribe(data=>{
        this.mS.list().subscribe(data => {
          this.mS.setlist(data);
        })
      });
      this.router.navigate(['medicamento']);
    }
    else {
      this.mensaje = 'Complete todos los campos, revise!!'
    }
  }
}
