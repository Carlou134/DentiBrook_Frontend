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
import { ReporteTipoPagoComponent } from './component/tipo-pago/reporte-tipo-pago/reporte-tipo-pago.component';
import { UsersComponent } from './component/users/users.component';
import { CreaeditaUsersComponent } from './component/users/creaedita-users/creaedita-users.component';
import { RolesComponent } from './component/roles/roles.component';
import { CreaeditaRolesComponent } from './component/roles/creaedita-roles/creaedita-roles.component';

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
      },
      {
        path: 'reporte', component: ReporteTipoPagoComponent
      }
    ]
  },
  {
    path: 'users', component: UsersComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaUsersComponent
      },
      {
        path: 'ediciones/:id', component: CreaeditaUsersComponent
      }
    ]
  },
  {
    path: 'roles', component: RolesComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaRolesComponent
      },
      {
        path: 'ediciones/:id', component: CreaeditaRolesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
