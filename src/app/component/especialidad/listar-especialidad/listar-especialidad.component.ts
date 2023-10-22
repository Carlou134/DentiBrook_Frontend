import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Especialidad } from 'src/app/model/especialidad';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-listar-especialidad',
  templateUrl: './listar-especialidad.component.html',
  styleUrls: ['./listar-especialidad.component.css']
})
export class ListarEspecialidadComponent implements OnInit{
  dataSource: MatTableDataSource<Especialidad> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'especialidad',
  ];

  constructor(private eS:EspecialidadService){}

  ngOnInit(): void {
      this.eS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      })
  }
}
