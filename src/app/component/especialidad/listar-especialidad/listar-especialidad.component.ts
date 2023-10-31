import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/service/especialidad.service';


@Component({
  selector: 'app-listar-especialidad',
  templateUrl: './listar-especialidad.component.html',
  styleUrls: ['./listar-especialidad.component.css']
})
export class ListarEspecialidadComponent implements OnInit{
  datasource:MatTableDataSource<Especialidad> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private eS: EspecialidadService){}

  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.eS.getlist().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) =>{
        this.eS.setlist(data);
      });
    });
  }
}
