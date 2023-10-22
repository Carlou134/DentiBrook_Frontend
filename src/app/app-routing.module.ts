import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { CreaeditaEspecialidadComponent } from './component/especialidad/creaedita-especialidad/creaedita-especialidad.component';

const routes: Routes = [
  {
    path: 'especialidad', component: EspecialidadComponent,
    children: [
      {
        path: 'nuevo', component: CreaeditaEspecialidadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
