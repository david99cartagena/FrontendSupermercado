import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoCrearDTO } from 'src/app/interfaces/producto-crear-dto';
import { ProductoEditarDTO } from 'src/app/interfaces/producto-editar-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Producto[]>(this.url);
  }

  crear(producto: ProductoCrearDTO) {
    return this.http.post(this.url, producto);
  }

  buscar(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  editar(id: number, producto: ProductoEditarDTO) {
    return this.http.put(`${this.url}/${id}`, producto);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
