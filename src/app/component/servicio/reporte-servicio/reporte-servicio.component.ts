import { Decimal } from 'decimal.js';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-reporte-servicio',
  templateUrl: './reporte-servicio.component.html',
  styleUrls: ['./reporte-servicio.component.css']
})
export class ReporteServicioComponent implements OnInit {
  dataSource: MatTableDataSource<Servicio> = new MatTableDataSource<Servicio>();
  precioForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  displayedColumns: string[] = ['codigo',
  'tipo',
  'precio',];

  constructor(private sS: ServicioService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.precioForm = this.formBuilder.group({
      precio: [null, Validators.required],
    });
  }

  buscar() {
    if (this.precioForm.valid) {
      const precios: Decimal = this.precioForm.value.precio;
      this.sS.buscar(precios.toString()).subscribe((data) => {
        this.dataSource.data = data;
        if (data.length === 0) {
          this.mensaje = "No se encontraron resultados para el nombre seleccionado.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.precioForm.get('precio')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese un nombre.';
      }
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.precioForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
