import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VentaDTO } from 'src/app/interfaces/venta-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private url = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) {}

  crearVenta(data: VentaDTO): Observable<any> {
    return this.http.post(this.url, data);
  }

  detalleVenta(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  datosVenta(): Observable<any> {
    return this.http.get(`${this.url}/datos-venta`);
  }
}
