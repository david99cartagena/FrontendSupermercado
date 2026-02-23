import { NgModule } from "@angular/core";
import { ListaProductosComponent } from "./pages/lista-productos/lista-productos.component";
import { CrearProductoComponent } from "./pages/crear-producto/crear-producto.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductosRoutingModule } from "./productos-routing.module";

@NgModule({
  declarations: [ListaProductosComponent, CrearProductoComponent],
  imports: [CommonModule, ReactiveFormsModule, ProductosRoutingModule],
})
export class ProductosModule {}