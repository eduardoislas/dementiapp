import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informed-consent',
  templateUrl: './informed-consent.page.html',
  styleUrls: ['./informed-consent.page.scss'],
})
export class InformedConsentPage implements OnInit {

  accepted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("Consentimiento informado")
  }

  accept() {
    console.log("Acepta")
    localStorage.setItem('informedConsent', 'true');
    this.router.navigate(['/dataconfirmation']); 
  }

  reject() {
    console.log("Rechaza")
    this.router.navigate(['/home']); 
  }

}
