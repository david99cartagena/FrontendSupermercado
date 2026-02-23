import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProductosComponent,
  },

  {
    path: 'crear',
    component: CrearProductoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class ProductosRoutingModule {}
