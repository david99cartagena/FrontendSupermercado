import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private url = `${environment.apiUrl}/ventasreport`;

  constructor(private http: HttpClient) {}

  reporteDiario(fecha: string): Observable<any> {
    return this.http.get(`${this.url}/diario/${fecha}`);
  }

  reporteSemanal(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`${this.url}/semanal`, { params: { fechaInicio, fechaFin } });
  }

  reporteMensual(anio: number, mes: number): Observable<any> {
    return this.http.get(`${this.url}/mensual/${anio}/${mes}`);
  }

  reporteAnual(anio: number): Observable<any> {
    return this.http.get(`${this.url}/anual/${anio}`);
  }
}
