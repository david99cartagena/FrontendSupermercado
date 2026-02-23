import { NgModule } from "@angular/core";
import { LoginComponent } from "./pages/login/login.component";
import { ListaUsuariosComponent } from "./pages/lista-usuarios/lista-usuarios.component";
import { CrearUsuarioComponent } from "./pages/crear-usuario/crear-usuario.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UsuariosRoutingModule } from "./usuarios-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule {}