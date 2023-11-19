import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { NgChartsModule } from 'ng2-charts';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { ListarOdontologoComponent } from './odontologo/listar-odontologo/listar-odontologo.component';
import { CreaeditaOdontologoComponent } from './odontologo/creaedita-odontologo/creaedita-odontologo.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteListarComponent } from './paciente/paciente-listar/paciente-listar.component';
import { CreaeditaPacienteComponent } from './paciente/creaedita-paciente/creaedita-paciente.component';
import { ReputacionComponent } from './reputacion/reputacion.component';
import { ListarReputacionComponent } from './reputacion/listar-reputacion/listar-reputacion.component';
import { CreaeditaReputacionComponent } from './reputacion/creaedita-reputacion/creaedita-reputacion.component';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';
import { Reporte03Component } from './reporte/reporte03/reporte03.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    LandingPageComponent,
    ReporteComponent,
    Reporte01Component,
    OdontologoComponent,
    ListarOdontologoComponent,
    CreaeditaOdontologoComponent,
    PacienteComponent,
    PacienteListarComponent,
    CreaeditaPacienteComponent,
    ReputacionComponent,
    ListarReputacionComponent,
    CreaeditaReputacionComponent,
    Reporte02Component,
    Reporte03Component
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgChartsModule,
    MatCardModule
  ]
})
export class ComponentModule { }
