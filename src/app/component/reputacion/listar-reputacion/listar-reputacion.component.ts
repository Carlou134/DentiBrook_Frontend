import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reputacion } from 'src/app/model/reputacion';
import { ReputacionService } from 'src/app/service/reputacion.service';

@Component({
  selector: 'app-listar-reputacion',
  templateUrl: './listar-reputacion.component.html',
  styleUrls: ['./listar-reputacion.component.css']
})
export class ListarReputacionComponent implements OnInit {
  dataSource: MatTableDataSource<Reputacion>=new MatTableDataSource();
  displayedColumns: String[]=['codigo',
  'odontologo',
  'paciente',
  'comentario',
  'estrellas',
  'accion01',
  'accion02',
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS: ReputacionService) {}
    ngOnInit(): void {
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.rS.getlist().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) =>{
        this.rS.setlist(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
