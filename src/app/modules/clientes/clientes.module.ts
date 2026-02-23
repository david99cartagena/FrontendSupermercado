import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from './pages/crear-cliente/crear-cliente.component';
import { ClientesRoutingModule } from './clientes-routing.module';

@NgModule({
  declarations: [ListaClientesComponent, CrearClienteComponent],
  imports: [CommonModule, ReactiveFormsModule, ClientesRoutingModule],
})
export class ClientesModule {}
