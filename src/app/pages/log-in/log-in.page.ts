import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogIn(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(
        (resData) => {
          console.log('Login uspesno');
          console.log(resData);
          this.router.navigateByUrl('movies/tabs/explore');
          form.reset();
        },
        (errRes) => {
          console.log(errRes);
          let message = 'Incorrect email or password.';

          this.alertCtrl
            .create({
              header: 'Authetication failed',
              message,
              buttons: ['OK'],
              cssClass: 'auth-alert',
            })
            .then((alert) => {
              alert.present();
            });
          form.reset();
        }
      );
    }
  }
}
