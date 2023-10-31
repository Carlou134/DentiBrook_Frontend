import { Decimal } from 'decimal.js';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  fecha_caducidad = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  formas:{value:string,viewValue:string}[]=[{value:'Tabletas',viewValue:'Tabletas'},
  {value:'Cápsulas',viewValue:'Cápsulas'}, {value:'Suspensiones',viewValue:'Suspensiones'},
  {value:'Jarabes',viewValue:'Jarabes'}, {value:'Inyecciones',viewValue:'Inyecciones'},
  {value:'Soluciones orales',viewValue:'Soluciones orales'}, {value:'Crema',viewValue:'Crema'},
  {value:'Ungüento',viewValue:'Ungüento'}, {value:'Soluciones orales',viewValue:'Soluciones orales'},
  {value:'Supositorios',viewValue:'Supositorios'}, {value:'Aerosoles nasales',viewValue:'Aerosoles nasales'},
  {value:'Geles y cremas',viewValue:'Geles y cremas'}, {value:'Polvos orales',viewValue:'Polvos orales'}]
  vias:{value:string,viewValue:string}[]=[{value:'Oral',viewValue:'Oral'},
  {value:'Tópica',viewValue:'Tópica'}, {value:'Rectal',viewValue:'Rectal'},
  {value:'Nasal',viewValue:'Nasal'}, {value:'Pulmonar',viewValue:'Pulmonar'},
  {value:'Uretral',viewValue:'Uretral'}]

  constructor(private mS:MedicamentoService,
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
      medicamento_id: ['',],
      nombre:['',Validators.required],
      forma_farmaceutica:['',Validators.required],
      via:['',Validators.required],
      fecha_caducidad:['',Validators.required],
      precio:['', [Validators.required, this.validateDecimal]],
    })
  }

  // Función de validación personalizada para el campo 'precio'
  validateDecimal(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === undefined) {
      return null; // Permitir valores nulos o indefinidos
    }

    // Verificar si el valor puede ser convertido a un objeto Decimal
    if (isNaN(Number(value))) {
      return { invalidDecimal: true }; // Devolver un error si no se puede convertir a Decimal
    }

    return null; // El valor es válido
  }

  aceptar():void{
    if(this.form.valid){
      this.medicamento.medicamento_id = this.form.value.medicamento_id;
      this.medicamento.nombre=this.form.value.nombre;
      this.medicamento.forma_farmaceutica = this.form.value.forma_farmaceutica;
      this.medicamento.via=this.form.value.via;
      this.medicamento.fecha_caducidad = this.form.value.fecha_caducidad;
      this.medicamento.precio=this.form.value.precio;
      if(this.edicion){
        this.mS.update(this.medicamento).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setlist(data);
          })
        })
      } else {
        this.mS.insert(this.medicamento).subscribe(data=>{
          this.mS.list().subscribe(data => {
            this.mS.setlist(data);
          })
        });
      }
      this.router.navigate(['medicamento']);
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
      this.mS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        medicamento_id: new FormControl(data.medicamento_id),
        nombre: new FormControl(data.nombre),
        forma_farmaceutica: new FormControl(data.forma_farmaceutica),
        via: new FormControl(data.via),
        fecha_caducidad: new FormControl(data.fecha_caducidad),
        precio: new FormControl(data.precio),
        });
      });
    }
  }
}
