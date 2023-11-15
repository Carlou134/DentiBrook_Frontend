import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Tipo_Pago } from 'src/app/model/tipo_pago';
import { TipoPagoService } from 'src/app/service/tipo-pago.service';

@Component({
  selector: 'app-creaedita-tipo-pago',
  templateUrl: './creaedita-tipo-pago.component.html',
  styleUrls: ['./creaedita-tipo-pago.component.css']
})
export class CreaeditaTipoPagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoPago:Tipo_Pago = new Tipo_Pago();
  mensaje:string = "";
  id: number = 0;
  edicion: boolean = false;
  tipos:{value:string,viewValue:string}[]=[{value:'Efectivo',viewValue:'Efectivo'},
  {value:'Cheque',viewValue:'Cheque'}, {value:'Yape',viewValue:'Yape'},
  {value:'Plin',viewValue:'Plin'}, {value:'Tarjeta',viewValue:'Tarjeta'},
  {value:'Paypal',viewValue:'Paypal'}]

  constructor(private tS:TipoPagoService,
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
      tipo_pago_id: ['',],
      metodoDePago:['',Validators.required],
      cuotas:['', [Validators.required, this.validateDescuento]],
      porcentaje_descuento:['', [Validators.required, this.validateDescuento]],
    })
  }

  // Función de validación personalizada para el campo 'porcentaje_descuento'
  validateDescuento(control: AbstractControl) {
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
    if (numericValue < 1 || numericValue > 100) {
      return { outOfRange: true }; // Devolver un error si está fuera del rango
    }

    return null; // El valor es válido
  }

  // Función de validación personalizada para el campo 'cuotas'
  validateCuotas(control: AbstractControl) {
    const value = control.value;

    if (value === null || value === undefined) {
      return null; // Permitir valores nulos o indefinidos
    }

    // Convertir el valor a un número
    const numericValue = parseInt(value, 10);

    // Verificar si el valor es un número entero seguro
    if (!Number.isSafeInteger(numericValue)) {
      return { invalidInteger: true }; // Devolver un error si no es un número entero seguro
    }

    // Verificar si el valor es positivo
    if (numericValue <= 0) {
      return { negativeValue: true }; // Devolver un error si es negativo o cero
    }

    // Definir el valor máximo de cuotas permitido
    const maxCuotas = 12; // Puedes ajustar este valor según tus necesidades

    // Verificar si el valor está en el rango permitido
    if (numericValue > maxCuotas) {
      return { outOfRange: true }; // Devolver un error si está fuera del rango
    }

    return null; // El valor es válido
  }




  aceptar():void{
    if(this.form.valid){
      this.tipoPago.tipo_pago_id = this.form.value.tipo_pago_id;
      this.tipoPago.metodoDePago=this.form.value.metodoDePago;
      this.tipoPago.cuotas=this.form.value.cuotas;
      this.tipoPago.porcentaje_descuento=this.form.value.porcentaje_descuento;
      if(this.edicion){
        this.tS.update(this.tipoPago).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setlist(data);
          })
        })
      } else {
        this.tS.insert(this.tipoPago).subscribe(data=>{
          this.tS.list().subscribe(data => {
            this.tS.setlist(data);
          })
        });
      }
      this.router.navigate(['/components/tipopago']);
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
      this.tS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
      tipo_pago_id: new FormControl(data.tipo_pago_id),
      metodoDePago: new FormControl(data.metodoDePago),
      cuotas: new FormControl(data.cuotas),
      porcentaje_descuento: new FormControl(data.porcentaje_descuento),
        });
      });
    }
  }
}
