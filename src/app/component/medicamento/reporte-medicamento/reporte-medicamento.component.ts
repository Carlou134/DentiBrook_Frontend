import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-reporte-medicamento',
  templateUrl: './reporte-medicamento.component.html',
  styleUrls: ['./reporte-medicamento.component.css']
})
export class ReporteMedicamentoComponent implements OnInit {
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource<Medicamento>();
  viaForm: FormGroup = new FormGroup({});
  mensaje: string = '';

  displayedColumns: string[] = ['codigo',
  'nombre',
  'forma',
  'via',
  'caducidad',
  'precio',];

  constructor(private mS: MedicamentoService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.viaForm = this.formBuilder.group({
      via: [null, Validators.required],
    });
  }

  buscar() {
    if (this.viaForm.valid) {
      const vias = this.viaForm.value.via;
      this.mS.buscar(vias).subscribe((data) => {
        this.dataSource.data = data;
        if (data.length === 0) {
          this.mensaje = "No se encontraron resultados para el nombre seleccionado.";
        } else {
          this.mensaje = '';
        }
      });
    } else {
      if (this.viaForm.get('via')?.hasError('required')) {
        this.mensaje = 'Por favor, ingrese un nombre.';
      }
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.viaForm.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
