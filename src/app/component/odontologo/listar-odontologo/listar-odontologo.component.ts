import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Odontologo } from 'src/app/model/odontologo';
import { OdontologoService } from 'src/app/service/odontologo.service';

@Component({
  selector: 'app-listar-odontologo',
  templateUrl: './listar-odontologo.component.html',
  styleUrls: ['./listar-odontologo.component.css']
})
export class ListarOdontologoComponent implements OnInit {
dataSource: MatTableDataSource<Odontologo>=new MatTableDataSource();
displayedColumns: String[]=['codigo',
'usuario',
'especialidad',
'anios',
'educacion',
'historial',
'horario',
'salario',
'accion01',
'accion02',
]
@ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(private oS: OdontologoService) {}
  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
}
eliminar(id: number) {
  this.oS.delete(id).subscribe((data) => {
    this.oS.list().subscribe((data) =>{
      this.oS.setList(data);
    });
  });
}

filter(en: any) {
  this.dataSource.filter = en.target.value.trim();
}
}