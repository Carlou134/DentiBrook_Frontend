import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServicioService } from 'src/app/service/servicio.service';
import { Servicio } from 'src/app/model/servicio';


@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css']
})
export class ListarServicioComponent implements OnInit {
  datasource:MatTableDataSource<Servicio> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'tipo',
    'precio',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: ServicioService){}

  ngOnInit(): void {
    this.sS.list().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.sS.getlist().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) =>{
        this.sS.setlist(data);
      });
    });
  }

  filter(en: any) {
    this.datasource.filter = en.target.value.trim();
  }
}
