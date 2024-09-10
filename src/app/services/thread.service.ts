import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";

import * as myglobals from '../globals';
import {Thread} from "../interfaces/assistant";

const urlAlz = myglobals.URL_ALZ;

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  private readonly getThreadEndpoint = 'https://api.example.com/getThread';
  private readonly createThreadEndpoint = 'https://api.example.com/createThread';

  constructor(private http: HttpClient) {}

// TODO: Verificar los endpoints con el server
  public initThread(): Observable<string> {
    return this.getThread().pipe(
      switchMap(thread => {
        if (thread && thread.id) {
          // Si el thread existe, devolver su ID
          return new Observable<string>(observer => {
            observer.next(thread.id);
            observer.complete();
          });
        } else {
          // Si el thread no existe, crearlo y devolver su nuevo ID
          return this.createThread().pipe(
            switchMap(newThread => {
              return new Observable<string>(observer => {
                observer.next(newThread.id);
                observer.complete();
              });
            })
          );
        }
      }),
      catchError(error => {
        console.error('Error initializing thread:', error);
        return throwError(error); // Lanza el error para ser manejado por el llamador de esta función
      })
    );
  }

  // Método privado para obtener el thread desde el endpoint
  private getThread(): Observable<Thread | null> {
    return this.http.get<Thread>(this.getThreadEndpoint).pipe(
      catchError(error => {
        console.error('Error fetching thread:', error);
        return new Observable<Thread | null>(observer => {
          observer.next(null); // Si hay un error, devolver null
          observer.complete();
        });
      })
    );
  }

  // Método privado para crear un nuevo thread
  private createThread(): Observable<Thread> {
    return this.http.post<Thread>(this.createThreadEndpoint, {
      // Datos necesarios para crear el thread (adaptar según sea necesario)
    }).pipe(
      catchError(error => {
        console.error('Error creating thread:', error);
        return throwError(error); // Lanza el error para ser manejado por el llamador de esta función
      })
    );
  }
}
