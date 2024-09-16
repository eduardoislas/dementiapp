import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUser} from "../interfaces/users";
import {Observable} from "rxjs";
import * as myglobals from '../globals';

const urlDem = myglobals.URL_DEM;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateUser(user: apiUser): Observable<apiUser> {
    return this.http.post<apiUser>(`${urlDem}/users/validate`, user);
  }
}
