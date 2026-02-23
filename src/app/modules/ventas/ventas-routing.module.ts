import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaVentasComponent } from './pages/lista-ventas/lista-ventas.component';
import { CrearVentaComponent } from './pages/crear-venta/crear-venta.component';

const routes: Routes = [
  { path: '', component: CrearVentaComponent },
  // { path: 'crear', component: CrearVentaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
