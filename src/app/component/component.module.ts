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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { ListarOdontologoComponent } from './odontologo/listar-odontologo/listar-odontologo.component';
import { CreaeditaOdontologoComponent } from './odontologo/creaedita-odontologo/creaedita-odontologo.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    LandingPageComponent,
    OdontologoComponent,
    ListarOdontologoComponent,
    CreaeditaOdontologoComponent
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
    MatIconModule
  ]
})
export class ComponentModule { }
