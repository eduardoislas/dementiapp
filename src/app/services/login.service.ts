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

    login(name: string, password: string): Observable<any> {
      return this.http.post<Login>(`${urlAlz}/login`, {
        name,
        password
      });
    }

  }
