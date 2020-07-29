import { Component, OnInit } from '@angular/core';
import { GalletaLocalService } from '../core/services/autenticar/cookie.service';

import { AuthenticationService } from '../core/services/autenticar/autenticar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user;


  constructor(
    private galletaLocalService: GalletaLocalService,
    private authenticationService: AuthenticationService,
) {
   }

  ngOnInit(): void {
    this.user = this.galletaLocalService.getCurrentSession();
  }


  public logout(): void {

    this.galletaLocalService.logout();

    /*this.authenticationService.logout().subscribe(
      response => { if (response) {
        }}
    );*/
  }

}
