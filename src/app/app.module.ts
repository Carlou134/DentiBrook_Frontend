import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { ListarEspecialidadComponent } from './component/especialidad/listar-especialidad/listar-especialidad.component';
import { CreaeditaEspecialidadComponent } from './component/especialidad/creaedita-especialidad/creaedita-especialidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';


import { MedicamentoComponent } from './component/medicamento/medicamento.component';
import { ListarMedicamentoComponent } from './component/medicamento/listar-medicamento/listar-medicamento.component';
import { CreaeditaMedicamentoComponent } from './component/medicamento/creaedita-medicamento/creaedita-medicamento.component';
import { ServicioComponent } from './component/servicio/servicio.component';
import { ListarServicioComponent } from './component/servicio/listar-servicio/listar-servicio.component';
import { CreaeditaServicioComponent } from './component/servicio/creaedita-servicio/creaedita-servicio.component';
import { TipoPagoComponent } from './component/tipo-pago/tipo-pago.component';
import { ListarTipoPagoComponent } from './component/tipo-pago/listar-tipo-pago/listar-tipo-pago.component';
import { CreaeditaTipoPagoComponent } from './component/tipo-pago/creaedita-tipo-pago/creaedita-tipo-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    EspecialidadComponent,
    ListarEspecialidadComponent,
    CreaeditaEspecialidadComponent,
    MedicamentoComponent,
    ListarMedicamentoComponent,
    CreaeditaMedicamentoComponent,
    ServicioComponent,
    ListarServicioComponent,
    CreaeditaServicioComponent,
    TipoPagoComponent,
    ListarTipoPagoComponent,
    CreaeditaTipoPagoComponent,
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
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
