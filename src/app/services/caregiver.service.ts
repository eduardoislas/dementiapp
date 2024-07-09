import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiCaregiver} from '../interfaces/caregivers';

import * as myglobals from '../globals';

const urlAlz = myglobals.URL_ALZ;

@Injectable({
  providedIn: 'root'
})
export class CaregiverService {

  constructor(private http: HttpClient) {
  }

  getCaregiverByUserId(userid: string) {
    return this.http.get<apiCaregiver>(`${urlAlz}/caregiver/user/${userid}`)
  }

}
