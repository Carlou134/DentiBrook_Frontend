import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from 'src/app/model/cita';
import { CitaService } from 'src/app/service/cita.service';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.component.html',
  styleUrls: ['./listar-cita.component.css']
})
export class ListarCitaComponent implements OnInit {
  dataSource: MatTableDataSource<Cita>=new MatTableDataSource();
  displayedColumns: String[]=['codigo',
  'paciente',
  'odontologo',
  'servicio',
  'pago',
  'fecha',
  'hora',
  'duracion',
  'motivo',
  'estado',
  'direccion',
  'tipo',
  'accion01',
  'accion02',
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: CitaService) {}
    ngOnInit(): void {
      this.cS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.cS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) =>{
        this.cS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
