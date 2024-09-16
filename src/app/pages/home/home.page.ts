import {Caregiver, apiCaregiver} from '../../interfaces/caregivers';
import {Component, OnInit} from '@angular/core';
import {CaregiverService} from '../../services/caregiver.service';
import {Router} from '@angular/router';
import {apiUser} from "../../interfaces/users";
import {UserService} from "../../services/user.service";
import {AssistantService} from "../../services/assistant.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private userId: string = "";
  private caregiver?: Caregiver;
  private apiUser?: apiUser;
  private informedConsent: boolean = false;
  private dataConfirmed: boolean = false;
  userName: string = "";
  patientName: string = "";

  constructor(private caregiverService: CaregiverService,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user') || "";
    this.caregiverService.getCaregiverByUserId(this.userId)
      .subscribe((resp: apiCaregiver) => {
        this.caregiver = resp.caregiver[0];
        this.userName = `${this.caregiver.name} ${this.caregiver.lastName} ${this.caregiver.lastNameSecond}`;
        this.patientName = `${this.caregiver.patient.name} ${this.caregiver.patient.lastName} ${this.caregiver.patient.lastNameSecond}`;

        // Guardar los datos en localStorage
        localStorage.setItem('caregiver', JSON.stringify(this.caregiver));
        localStorage.setItem('patient', JSON.stringify(this.caregiver.patient));

        // Crear el objeto nuevo de usuario
        const newUser: apiUser = {
          caregiverId: this.caregiver._id,
          username: this.caregiver.user.name,
          patientId: this.caregiver.patient._id,
          informedConsent: true,
          dataConfirmed: true
        };
        this.informedConsent = localStorage.getItem('informedConsent') === 'true';
        this.dataConfirmed = localStorage.getItem('dataConfirmed') === 'true';
        this.userService.validateUser(newUser).subscribe((resp: apiUser) => {
          this.apiUser = resp;
          localStorage.setItem('threadId', JSON.stringify(this.apiUser.threadId));
        });
        if (!this.informedConsent && !this.apiUser?.informedConsent) {
          this.navigateTo('informedconsent');
        } else if (!this.dataConfirmed && !this.apiUser?.dataConfirmed) {
          this.navigateTo('dataconfirmation');
        } else {
          this.navigateTo('home');
        }
      });
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

}
