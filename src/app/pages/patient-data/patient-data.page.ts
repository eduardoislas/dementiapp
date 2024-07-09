import { Component, OnInit } from '@angular/core';
import { Patient } from "../../interfaces/caregivers";

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.page.html',
  styleUrls: ['./patient-data.page.scss'],
})
export class PatientDataPage implements OnInit {

  private patient?: Patient;

  constructor() {
  }

  ngOnInit() {
    const patientString = localStorage.getItem('patient');
    if (patientString) {
      this.patient = JSON.parse(patientString);
    }
    console.log(this.patient)
  }
}
