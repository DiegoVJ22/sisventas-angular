import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { responseCliente } from '../interfaces/responseCliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() {}
  lista(): Observable<responseCliente> {
    return this.http.get<responseCliente>(`${this.baseUrl}clientes`);
  }
}
