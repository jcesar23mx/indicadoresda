import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';



import { AuthenticationService } from '../core/services/autenticar/autenticar.service';
import { GalletaLocalService } from '../core/services/autenticar/cookie.service';

import { User } from '../core/services/autenticar/user_model';
import { LoginObject } from '../core/services/autenticar/user_model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public error: { code: number, message: string } = null;
  public user;
  public loginStore: LoginObject;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private galletaLocalService: GalletaLocalService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.storageLogin();
    this.loginForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        contrasena: ['', Validators.required],
    });

  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;

    if (this.loginForm.valid) {
      this.authenticationService.login(new LoginObject(this.loginForm.value))
        .subscribe(
          data => {
            const usuario: User = data.body[0];
            this.correctLogin(usuario);
          },
          error => {
            this.error = JSON.parse(error._body);
          }
        );
    }
  }
  private correctLogin(data: User) {
    this.galletaLocalService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

  private storageLogin() {
    console.log('Verificandocheck-->');
    console.log(this.galletaLocalService.getCurrentSession());
    console.log(this.galletaLocalService.isAuthenticated());

    if (this.galletaLocalService.isAuthenticated()) {
        console.log('Debe iniciar sesión');
        this.router.navigate(['/home']);
    }
  }


}
