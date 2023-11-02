import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { CreaeditaEspecialidadComponent } from './component/especialidad/creaedita-especialidad/creaedita-especialidad.component';
import { MedicamentoComponent } from './component/medicamento/medicamento.component';
import { CreaeditaMedicamentoComponent } from './component/medicamento/creaedita-medicamento/creaedita-medicamento.component';
import { ServicioComponent } from './component/servicio/servicio.component';
import { CreaeditaServicioComponent } from './component/servicio/creaedita-servicio/creaedita-servicio.component';
import { TipoPagoComponent } from './component/tipo-pago/tipo-pago.component';
import { CreaeditaTipoPagoComponent } from './component/tipo-pago/creaedita-tipo-pago/creaedita-tipo-pago.component';
import { ReporteEspecialidadComponent } from './component/especialidad/reporte-especialidad/reporte-especialidad.component';
import { ReporteMedicamentoComponent } from './component/medicamento/reporte-medicamento/reporte-medicamento.component';
import { ReporteServicioComponent } from './component/servicio/reporte-servicio/reporte-servicio.component';

const routes: Routes = [
  {
    path: 'especialidad', component: EspecialidadComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaEspecialidadComponent
      },
      {
        path: 'ediciones/:id', component: CreaeditaEspecialidadComponent
      },
      {
        path: 'reporte', component: ReporteEspecialidadComponent
      }
    ]
  },
  {
    path: 'medicamento', component: MedicamentoComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaMedicamentoComponent
      },
      {
        path: 'ediciones/:id', component: CreaeditaMedicamentoComponent
      },
      {
        path: 'reporte', component: ReporteMedicamentoComponent
      }
    ]
  },
  {
    path: 'servicios', component: ServicioComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaServicioComponent
      },
      {
        path: 'ediciones/:id', component: CreaeditaServicioComponent
      },
      {
        path: 'reporte', component: ReporteServicioComponent
      }
    ]
  },
  {
    path: 'tipopago', component: TipoPagoComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaTipoPagoComponent
      },
      {
        path: 'ediciones/:id', component: CreaeditaTipoPagoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
