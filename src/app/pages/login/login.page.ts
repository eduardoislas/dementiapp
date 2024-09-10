import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.storage.create();
  }

  login(username: any, password: any) {
    this.loginService.login(username, password).subscribe((res: { user: User, token: string }) => {
      const user: User = res.user;
      if (user.role === 'FAMILIAR') {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', user._id);
        this.router.navigate(['/home']);
      } else {
        this.presentAlert('Debe ser familiar');
      }
    }, err => {
      if (err) {
        this.presentAlert('Ocurrió algo inesperado, valide datos y reintente');
      } else {
        this.presentAlert();
      }
    });
  }

  async presentAlert(message?: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error.',
      subHeader: 'No se pudo iniciar sesión.',
      message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            return;
          }
        }
      ]
    });
    await alert.present();
  }

}
