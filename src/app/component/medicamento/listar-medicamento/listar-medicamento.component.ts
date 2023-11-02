import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Medicamento } from 'src/app/model/medicamento';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-listar-medicamento',
  templateUrl: './listar-medicamento.component.html',
  styleUrls: ['./listar-medicamento.component.css']
})
export class ListarMedicamentoComponent implements OnInit {
  datasource:MatTableDataSource<Medicamento> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'forma',
    'via',
    'caducidad',
    'precio',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mS: MedicamentoService){}

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.mS.getlist().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) =>{
        this.mS.setlist(data);
      });
    });
  }

  filter(en: any) {
    this.datasource.filter = en.target.value.trim();
  }
}
