import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { responseProducto } from '../interfaces/responseProducto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() {}
  lista(): Observable<responseProducto> {
    return this.http.get<responseProducto>(`${this.baseUrl}productos`);
  }
}
