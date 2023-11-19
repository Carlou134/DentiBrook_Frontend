import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartOptions, ChartDataset } from 'chart.js';
import { OdontologoService } from 'src/app/service/odontologo.service';

@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private oS: OdontologoService) {}
  ngOnInit(): void {
    this.oS.getSuma().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreEspecialidad);
      this.barChartData=[
        {
          data:data.map(item=>item.totalPacientes),label:'Total Historial Pacientes',
          backgroundColor:'rgba(255,0,0,0.5)'
        }
      ]
    });
  }
}
