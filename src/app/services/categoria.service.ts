import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { responseCategoria } from '../interfaces/respondeCategoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() {}
  lista(): Observable<responseCategoria> {
    return this.http.get<responseCategoria>(`${this.baseUrl}categorias`);
  }
}
