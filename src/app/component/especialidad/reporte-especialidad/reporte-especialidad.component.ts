import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-reporte-especialidad',
  templateUrl: './reporte-especialidad.component.html',
  styleUrls: ['./reporte-especialidad.component.css']
})
export class ReporteEspecialidadComponent implements OnInit {
  dataSource: MatTableDataSource<Especialidad> = new MatTableDataSource<Especialidad>();
  nombreForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  displayedColumns: string[] = ['codigo', 'nombre',];

  constructor(private eS: EspecialidadService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.nombreForm = this.formBuilder.group({
      nombreEspecialidad: [null, Validators.required],
    });
  }

  buscar() {
    if (this.nombreForm.valid) {
      const nombres = this.nombreForm.value.nombreEspecialidad;
      this.eS.buscar(nombres).subscribe((data) => {
        this.dataSource.data = data;
        if (data.length === 0) {
          this.mensaje = "No se encontraron resultados para el nombre seleccionado.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.nombreForm.get('nombreEspecialidad')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese un nombre.';
      }
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.nombreForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
