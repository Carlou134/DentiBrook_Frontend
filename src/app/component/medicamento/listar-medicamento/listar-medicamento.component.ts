import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrls: ['./listar-medicamento.component.css']
})
export class ListarMedicamentoComponent implements OnInit {
  dataSource: MatTableDataSource<Medicamento> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'medicamento',
    'forma',
    'via',
    'caducidad',
    'precio'
  ];

  constructor(private mS:MedicamentoService){}

  ngOnInit(): void {
      this.mS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      })
  }
}
