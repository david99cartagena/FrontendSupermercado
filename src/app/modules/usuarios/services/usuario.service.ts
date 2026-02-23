import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { Usuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  crear(usuario: Usuario) {
    return this.http.post(`${this.url}/crear`, usuario);
  }

  listar() {
    return this.http.get<Usuario[]>(this.url);
  }

  buscar(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  editar(id: number, usuario: Usuario) {
    return this.http.put(`${this.url}/${id}`, usuario);
  }

  login(datos: Login) {
    return this.http.post(`${this.url}/login`, datos);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
