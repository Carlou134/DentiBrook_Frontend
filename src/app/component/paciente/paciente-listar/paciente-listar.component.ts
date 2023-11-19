import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-paciente-listar',
  templateUrl: './paciente-listar.component.html',
  styleUrls: ['./paciente-listar.component.css']
})
export class PacienteListarComponent implements OnInit {
  dataSource: MatTableDataSource<Paciente>=new MatTableDataSource();
  displayedColumns: String[]=['codigo',
  'usuario',
  'contacto',
  'accion01',
  'accion02',
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private pS: PacienteService) {}
    ngOnInit(): void {
      this.pS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.pS.getlist().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) =>{
        this.pS.setlist(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
