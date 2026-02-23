import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./modules/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule,
      ),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modules/clientes/clientes.module').then(
        (m) => m.ClientesModule,
      ),
  },

  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/productos/productos.module').then(
        (m) => m.ProductosModule,
      ),
  },

  {
    path: 'ventas',
    loadChildren: () =>
      import('./modules/ventas/ventas.module').then((m) => m.VentasModule),
  },

  {
    path: '',
    redirectTo: 'usuarios/login',
    pathMatch: 'full',
  },
  {
    path: '**', // Comodín para rutas no encontradas
    redirectTo: 'usuarios/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // forRoot solo aquí
  exports: [RouterModule],
})
export class AppRoutingModule {}
