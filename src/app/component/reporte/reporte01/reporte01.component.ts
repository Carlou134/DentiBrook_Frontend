import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset } from 'chart.js';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels:string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsersService){}

  ngOnInit(): void {
    this.uS.getSuma().subscribe((data) => {
      this.barChartLabels = data.map((item)=>item.rol);
      this.barChartData=[
        {
          data:data.map(item=>item.QuantityUsers),label:'Total Usuarios asignados',
          backgroundColor: 'rgba(255,0,0,0.8)'
        }
      ]
    });
  }
}
