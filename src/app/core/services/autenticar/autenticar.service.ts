import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginObject } from './user_model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService  {

  constructor( private http: HttpClient) { }

    login(loginObj: LoginObject) {
      return this.http.post(`${environment.url_api}/autenticar`, loginObj);
    }

    logout() {
      return this.http.post(`${environment.url_api}/logout`, {});
    }

   /*getToken(user: string, password: string) {
    console.log(`Envía post ${user.toLowerCase()} , ${password.toLowerCase()} `);
    return this.http.post(`${environment.url_api}/autenticar/`,
                          { usuario: user.toLowerCase(), contrasena: password.toLowerCase()  });
  }*/

}
