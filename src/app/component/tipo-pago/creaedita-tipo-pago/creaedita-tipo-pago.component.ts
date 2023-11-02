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
      cuotas:['',Validators.required],
      porcentaje_descuento:['',Validators.required]
    })
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
      this.router.navigate(['tipopago']);
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
