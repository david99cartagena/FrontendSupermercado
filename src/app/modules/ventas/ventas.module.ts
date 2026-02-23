import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VentasRoutingModule } from './ventas-routing.module';
import { ListaVentasComponent } from './pages/lista-ventas/lista-ventas.component';
import { CrearVentaComponent } from './pages/crear-venta/crear-venta.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

@NgModule({
  declarations: [ListaVentasComponent, CrearVentaComponent, ReportesComponent],
  imports: [CommonModule, ReactiveFormsModule, VentasRoutingModule],
})
export class VentasModule {}
