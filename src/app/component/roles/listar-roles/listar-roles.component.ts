import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/model/roles';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'rol',
    'usuario',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS: RolesService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) =>{
        this.rS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
