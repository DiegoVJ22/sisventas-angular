import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { responseUnidad } from '../interfaces/responseUnidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() {}
  lista(): Observable<responseUnidad> {
    return this.http.get<responseUnidad>(`${this.baseUrl}unidades`);
  }
}
