import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Tipo_Pago } from 'src/app/model/tipo_pago';
import { TipoPagoService } from 'src/app/service/tipo-pago.service';

@Component({
  selector: 'app-reporte-tipo-pago',
  templateUrl: './reporte-tipo-pago.component.html',
  styleUrls: ['./reporte-tipo-pago.component.css']
})
export class ReporteTipoPagoComponent implements OnInit {
  dataSource: MatTableDataSource<Tipo_Pago> = new MatTableDataSource<Tipo_Pago>();
  tipoPagoForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  displayedColumns: string[] = ['codigo',
  'metodo',
  'cuotas',
  'porcentaje',];

  constructor(private tS: TipoPagoService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.tipoPagoForm = this.formBuilder.group({
      metodoDePago: [null, Validators.required],
    });
  }

  buscar() {
    if (this.tipoPagoForm.valid) {
      const metodosDePago = this.tipoPagoForm.value.metodoDePago;
      this.tS.buscar(metodosDePago).subscribe((data) => {
        this.dataSource.data = data;
        if (data.length === 0) {
          this.mensaje = "No se encontraron resultados para el nombre seleccionado.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.tipoPagoForm.get('metodoDePago')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese un nombre.';
      }
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.tipoPagoForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
