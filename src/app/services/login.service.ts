import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/users';

import * as myglobals from '../globals';
import { Observable } from 'rxjs';

// Obtener URL del server en globals
const urlAlz = myglobals.URL_ALZ;

@Injectable({
    providedIn: "root"
  })
  export class LoginService {
    constructor(private http: HttpClient) { }

    /**
   * Método POST que envía los datos del usuario para realizar el inicio
   * de sesión. Estos datos son obtenidos de login.page.ts
   * @param name 
   * @param password 
   */
    login(name: string, password: string): Observable<any> {
      console.log(name)
      console.log(password)
      return this.http.post<Login>(`${urlAlz}/login`, {
        name,
        password
      });
    }

  }