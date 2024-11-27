import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import {
  responseAgregarCliente,
  responseCliente,
} from '../interfaces/responseCliente';
import { agregarCliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() {}
  lista(search?: string): Observable<responseCliente> {
    let params = new HttpParams();

    // Si se proporciona un término de búsqueda, se agrega a los parámetros
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<responseCliente>(`${this.baseUrl}clientes`, {
      params,
    });
  }
  agregarCliente(objeto: agregarCliente): Observable<responseAgregarCliente> {
    return this.http.post<responseAgregarCliente>(
      `${this.baseUrl}clientes`,
      objeto
    );
  }
}
