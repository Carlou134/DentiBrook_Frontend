import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset } from 'chart.js';
import { OdontologoService } from 'src/app/service/odontologo.service';

@Component({
  selector: 'app-reporte03',
  templateUrl: './reporte03.component.html',
  styleUrls: ['./reporte03.component.css']
})
export class Reporte03Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private oS: OdontologoService) {}
  ngOnInit(): void {
    this.oS.getSumaestrellas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre);
      this.barChartData=[
        {
          data:data.map(item=>item.totalEstrellas),label:'Total Estrellas Obtenidas',
          backgroundColor:'rgba(255,0,0,0.5)'
        }
      ]
    });
  }
}
