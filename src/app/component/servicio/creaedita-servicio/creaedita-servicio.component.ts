import { Decimal } from 'decimal.js';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-creaedita-servicio',
  templateUrl: './creaedita-servicio.component.html',
  styleUrls: ['./creaedita-servicio.component.css']
})
export class CreaeditaServicioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  servicio:Servicio = new Servicio();
  mensaje:string = "";
  id: number = 0;
  edicion: boolean = false;

  constructor(private sS:ServicioService,
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
      tipo_servicio:['',Validators.required],
      precio:['', [Validators.required, this.validateDecimal]],
    })
  }

  // Función de validación personalizada para el campo 'precio'
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

  aceptar():void{
    if(this.form.valid){
      this.servicio.id = this.form.value.id;
      this.servicio.tipo_servicio=this.form.value.tipo_servicio;
      this.servicio.precio=this.form.value.precio;
      if(this.edicion){
        this.sS.update(this.servicio).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setlist(data);
          })
        })
      } else {
        this.sS.insert(this.servicio).subscribe(data=>{
          this.sS.list().subscribe(data => {
            this.sS.setlist(data);
          })
        });
      }
      this.router.navigate(['/components/servicios']);
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
      this.sS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        id: new FormControl(data.id),
        tipo_servicio: new FormControl(data.tipo_servicio),
        precio: new FormControl(data.precio),
        });
      });
    }
  }
}
