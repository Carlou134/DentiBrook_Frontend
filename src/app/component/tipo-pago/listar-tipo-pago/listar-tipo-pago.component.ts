import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tipo_Pago } from 'src/app/model/tipo_pago';
import { TipoPagoService } from 'src/app/service/tipo-pago.service';

@Component({
  selector: 'app-listar-tipo-pago',
  templateUrl: './listar-tipo-pago.component.html',
  styleUrls: ['./listar-tipo-pago.component.css']
})
export class ListarTipoPagoComponent implements OnInit {
  datasource:MatTableDataSource<Tipo_Pago> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'metodo',
    'cuotas',
    'porcentaje',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TipoPagoService){}

  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.tS.getlist().subscribe(data => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe((data) =>{
        this.tS.setlist(data);
      });
    });
  }

  filter(en: any) {
    this.datasource.filter = en.target.value.trim();
  }
}
