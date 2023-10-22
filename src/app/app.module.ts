import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { ListarEspecialidadComponent } from './component/especialidad/listar-especialidad/listar-especialidad.component';
import { CreaeditaEspecialidadComponent } from './component/especialidad/creaedita-especialidad/creaedita-especialidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MedicamentoComponent } from './component/medicamento/medicamento.component';
import { ListarMedicamentoComponent } from './component/medicamento/listar-medicamento/listar-medicamento.component';
import { CreaeditaMedicamentoComponent } from './component/medicamento/creaedita-medicamento/creaedita-medicamento.component';

@NgModule({
  declarations: [
    AppComponent,
    EspecialidadComponent,
    ListarEspecialidadComponent,
    CreaeditaEspecialidadComponent,
    MedicamentoComponent,
    ListarMedicamentoComponent,
    CreaeditaMedicamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
