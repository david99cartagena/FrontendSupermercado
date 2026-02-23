import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'usuarios', component: ListaUsuariosComponent },
      { path: 'crear', component: CrearUsuarioComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
