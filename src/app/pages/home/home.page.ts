import { Caregiver, apiCaregiver } from './../../interfaces/caregivers';
import { Component, OnInit } from '@angular/core';
import { CaregiverService } from '../../services/caregiver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private userId: string = "";
  private caregiver?: Caregiver;
  private informedConsent: boolean = false;
  private dataConfirmed: boolean = false;
  userName: string = "";
  patientName: string = "";

  constructor(private caregiverService: CaregiverService,
    private router: Router) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user') || "";

    this.caregiverService.getCaregiverByUserId(this.userId)
      .subscribe((resp: apiCaregiver) => {
        this.caregiver = resp.caregiver[0];
        this.userName = `${this.caregiver.name} ${this.caregiver.lastName} ${this.caregiver.lastNameSecond}`;
        this.patientName = `${this.caregiver.patient.name} ${this.caregiver.patient.lastName} ${this.caregiver.patient.lastNameSecond}`;
        localStorage.setItem('caregiver', JSON.stringify(this.caregiver));
        localStorage.setItem('patient', JSON.stringify(this.caregiver.patient));
      })
    this.informedConsent = localStorage.getItem('informedConsent') === 'true';
    this.dataConfirmed = localStorage.getItem('dataConfirmed') === 'true';

    if (!this.informedConsent)
      this.navigateTo('informedconsent')
    else if (!this.dataConfirmed)
      this.navigateTo('dataconfirmation')

  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

}
