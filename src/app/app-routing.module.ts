import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { CreaeditaEspecialidadComponent } from './component/especialidad/creaedita-especialidad/creaedita-especialidad.component';
import { MedicamentoComponent } from './component/medicamento/medicamento.component';
import { CreaeditaMedicamentoComponent } from './component/medicamento/creaedita-medicamento/creaedita-medicamento.component';

const routes: Routes = [
  {
    path: 'especialidad', component: EspecialidadComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaEspecialidadComponent
      }
    ]
  },
  {
    path: 'medicamento', component: MedicamentoComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaMedicamentoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
