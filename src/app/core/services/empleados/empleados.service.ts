import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleado } from './empleado.model';
import { GalletaLocalService } from '../../../core/services/autenticar/cookie.service';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  public token: string = this.galletaLocalService.getCurrentToken();

  constructor(
    private http: HttpClient,
    private galletaLocalService: GalletaLocalService,
   ) { }

  getAllEmpleados(): Observable<Empleado[]>  {
    const headers = { 'access-token': this.token};
    return this.http.get<Empleado[]>(`${environment.url_api}/nominas/`, { headers });
  }

  getEmpleado(numemp): Observable<Empleado> {
    const headers = { 'access-token': this.token};
    console.log(`headers-->${this.token}`);
    return this.http.get<Empleado>(`${environment.url_api}/nominas/${numemp}`, { headers });
  }

  updateEmpleado(numemp, changes: Partial<Empleado>) {
    return this.http.patch(`${environment.url_api}/nominas/${numemp}`, {changes});
  }
}
