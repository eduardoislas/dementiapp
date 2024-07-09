import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caregiver, apiCaregiver } from 'src/app/interfaces/caregivers';
import { CaregiverService } from 'src/app/services/caregiver.service';
import { formatDate } from 'src/app/utils/date-format';

@Component({
  selector: 'app-data-confirmation',
  templateUrl: './data-confirmation.page.html',
  styleUrls: ['./data-confirmation.page.scss'],
})
export class DataConfirmationPage implements OnInit {

  name: string = "";
  lastName: string = "";
  lastNameSecond: string = "";
  birthdate: string = "";
  gender: string = "";
  school: string = "";
  occupation: string = "";
  nameP: string = "";
  lastNameP: string = "";
  lastNameSecondP: string = "";
  birthDateP: string = "";
  relation: string = "";
  phase: string = "";
  diagnosis: string[] = [];

  private userId: string = "";
  private caregiver?: Caregiver;

  constructor(private caregiverService: CaregiverService,
    private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user') || "";

    this.caregiverService.getCaregiverByUserId(this.userId)
      .subscribe((resp: apiCaregiver) => {
        this.caregiver = resp.caregiver[0];
        this.convertCaregiverToForm(this.caregiver);
      })

  }

  confirmar() {
    console.log('Nombre:', this.name);
    console.log('Fecha:', this.birthdate);
    console.log('Confirma que', this.nameP, 'es su', this.relation);
    localStorage.setItem('dataConfirmed', 'true');
    this.router.navigate(['/home']);
  }

  convertCaregiverToForm(caregiver: Caregiver) {
    if (caregiver && caregiver.patient) {
      this.name = caregiver.name;
      this.lastName = caregiver.lastName;
      this.lastNameSecond = caregiver.lastNameSecond;
      this.birthdate = formatDate(new Date(caregiver.birthdate));
      this.gender = caregiver.gender;
      this.school = caregiver.school;
      this.occupation = caregiver.occupation;
      this.nameP = caregiver.patient.name;
      this.lastNameP = caregiver.patient.lastName;
      this.lastNameSecondP = caregiver.patient.lastNameSecond;
      this.birthDateP = formatDate(new Date(caregiver.patient.birthdate));
      this.relation = caregiver.relation;
      this.phase = caregiver.patient.phase;
      this.diagnosis = caregiver.patient.diagnosis.map(diagnosis => diagnosis.name);
    }
    else {
      console.error('No se encontró información del cuidador/paciente');
    }
  }

}
