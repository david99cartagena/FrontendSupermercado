import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './pages/crear-cliente/crear-cliente.component';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'crear', component: CrearClienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
