import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { user } from '../interfaces/user';
import { Observable } from 'rxjs';
import { responseRegister } from '../interfaces/responseRegister';
import { responseLogin } from '../interfaces/responseLogin';
import { login } from '../interfaces/login';
import { responseToken } from '../interfaces/responseToken';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() {}

  registrarse(objeto: user): Observable<responseRegister> {
    return this.http.post<responseRegister>(`${this.baseUrl}register`, objeto);
  }
  login(objeto: login): Observable<responseLogin> {
    return this.http.post<responseLogin>(`${this.baseUrl}login`, objeto);
  }
  validarToken(token: string): Observable<responseToken> {
    return this.http.get<responseToken>(
      `${this.baseUrl}validar-token?token=${token}`
    );
  }
}
