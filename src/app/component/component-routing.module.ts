import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { CreaeditaEspecialidadComponent } from './especialidad/creaedita-especialidad/creaedita-especialidad.component';
import { ReporteEspecialidadComponent } from './especialidad/reporte-especialidad/reporte-especialidad.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { CreaeditaMedicamentoComponent } from './medicamento/creaedita-medicamento/creaedita-medicamento.component';
import { ReporteMedicamentoComponent } from './medicamento/reporte-medicamento/reporte-medicamento.component';
import { ServicioComponent } from './servicio/servicio.component';
import { CreaeditaServicioComponent } from './servicio/creaedita-servicio/creaedita-servicio.component';
import { ReporteServicioComponent } from './servicio/reporte-servicio/reporte-servicio.component';
import { TipoPagoComponent } from './tipo-pago/tipo-pago.component';
import { CreaeditaTipoPagoComponent } from './tipo-pago/creaedita-tipo-pago/creaedita-tipo-pago.component';
import { ReporteTipoPagoComponent } from './tipo-pago/reporte-tipo-pago/reporte-tipo-pago.component';
import { UsersComponent } from './users/users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import { RolesComponent } from './roles/roles.component';
import { CreaeditaRolesComponent } from './roles/creaedita-roles/creaedita-roles.component';
import { HomeComponent } from './home/home.component';
import { ReporteComponent } from './reporte/reporte.component';



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
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'reportes',
    component: ReporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
