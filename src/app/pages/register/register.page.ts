import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtlr: LoadingController
  ) {
    this.registerForm = new FormGroup({});
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  onRegister() {
    this.loadingCtlr
      .create({ message: 'Creating the account...' })
      .then((loadingElement) => {
        loadingElement.present();
        this.auth.register(this.registerForm.value).subscribe((resData) => {
          console.log('Successful registration.');
          console.log(resData);
          loadingElement.dismiss();
          this.router.navigateByUrl('/movies');
        });
      });
  }
}
