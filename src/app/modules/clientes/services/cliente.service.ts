import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteCrearDTO } from 'src/app/interfaces/cliente-crear-dto';
import { ClienteEditarDTO } from 'src/app/interfaces/cliente-editar-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Cliente[]>(this.url);
  }

  crear(data: ClienteCrearDTO) {
    return this.http.post(this.url, data);
  }

  editar(id: number, data: ClienteEditarDTO) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  buscarPorId(id: number) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  buscarPorIdentificacion(identificacion: string) {
    return this.http.get<Cliente>(`${this.url}/identificacion/${identificacion}`);
  }
}
